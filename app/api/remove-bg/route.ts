import type { NextRequest } from 'next/server';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getAuth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import ffprobeStatic from 'ffprobe-static';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetchOrig from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';

// 移除 usageMap 和免费额度相关逻辑

const fetch = (url: any, options: any) => fetchOrig(url, options);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const proxyUrl = process.env.PROXY_URL; // 例：http://127.0.0.1:7899
const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
  }
  try {
    // 1. 解析 multipart/form-data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${uuidv4()}-${file.name}`;
    const fileType = file.type || 'video/mp4';

    const backgroundColor = formData.get('background_color') as string || '#FFFFFF';

    // ====== 检查视频时长（每次最多30秒） ======
    const tempPath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(tempPath, buffer);
    const getDuration = async (filePath: string) => {
      const { execSync } = await import('node:child_process');
      const ffprobePath = ffprobeStatic.path;
      try {
        const out = execSync(`"${ffprobePath}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`).toString();
        return Math.ceil(Number.parseFloat(out));
      } catch {
        return 0;
      }
    };
    const durationSec = await getDuration(tempPath);
    fs.unlinkSync(tempPath);
    if (durationSec <= 0) {
      return new Response(JSON.stringify({ error: 'Failed to get video duration' }), { status: 400 });
    }
    if (durationSec > 30) {
      return new Response(JSON.stringify({ error: '免费用户每次最多处理30秒视频' }), { status: 429 });
    }

    // ====== 积分校验 ======
    const { data: pointsData, error: pointsError } = await supabase
      .from('points')
      .select('balance')
      .eq('user_id', userId)
      .single();
    if (pointsError) {
      return new Response(JSON.stringify({ error: 'Failed to fetch points' }), { status: 500 });
    }
    const currentBalance = pointsData?.balance || 0;
    const cost = durationSec / 60; // 精确到秒计费，1积分=60秒
    if (currentBalance < cost) {
      return new Response(JSON.stringify({ error: 'Insufficient points', currentBalance, requiredAmount: cost }), { status: 403 });
    }

    // 2. 上传到 Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET!)
      .upload(`videos/${fileName}`, buffer, {
        contentType: fileType,
        upsert: true,
      });
    if (uploadError) {
      console.error('Supabase 上传失败:', uploadError);
      return new Response(JSON.stringify({ error: 'Supabase 上传失败', detail: uploadError.message }), { status: 500 });
    }
    const { data: publicUrlData } = supabase
      .storage
      .from(process.env.SUPABASE_STORAGE_BUCKET!)
      .getPublicUrl(`videos/${fileName}`);
    const fileUrl = publicUrlData.publicUrl;

    // 3. 调用 Replicate AI
    const replicateRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'c18392381d1b5410b5a76b9b0c58db132526d3f79fe602e04e0d80cb668df509',
        input: {
          video: fileUrl,
          mode: 'Fast',
          background_color: backgroundColor,
        },
      }),
      agent,
    });
    const prediction = await replicateRes.json();

    let result: any = prediction;
    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise(r => setTimeout(r, 3000));
      const poll = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
        agent,
      });
      result = await poll.json();
    }

    if (result.status === 'succeeded') {
      // 扣除积分
      const { error: updateError } = await supabase
        .from('points')
        .update({ balance: currentBalance - cost })
        .eq('user_id', userId);
      if (updateError) {
        return new Response(JSON.stringify({ error: 'Failed to deduct points' }), { status: 500 });
      }
      return new Response(JSON.stringify({ resultUrl: result.output }), { status: 200 });
    } else {
      console.error('AI处理失败:', result);
      return new Response(JSON.stringify({ error: 'AI处理失败' }), { status: 500 });
    }
  } catch (err: any) {
    console.error('remove-bg error:', err);
    return new Response(JSON.stringify({ error: '服务器异常', detail: String(err) }), { status: 500 });
  }
}
