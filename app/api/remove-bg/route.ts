import type { NextRequest } from 'next/server';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetchOrig from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';

const usageMap: Map<string, { date: string; count: number; duration: number }> = new Map();

const fetch = (url: any, options: any) => fetchOrig(url, options);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const proxyUrl = process.env.PROXY_URL; // 例：http://127.0.0.1:7899
const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

// ====== 免费额度限制（MVP，基于IP，内存Map） ======
// 所有 var 声明已移到函数顶部或改为 let/const

export async function POST(req: NextRequest) {
  try {
    // 0. 获取IP和日期
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const today = new Date().toISOString().slice(0, 10);
    let usage = usageMap.get(ip) || { date: today, count: 0, duration: 0 };
    if (usage.date !== today) {
      usage = { date: today, count: 0, duration: 0 };
    }
    if (usage.count >= 3 || usage.duration >= 60) {
      return new Response(JSON.stringify({ error: '今日免费额度已用完（每天最多3次或累计60秒）' }), { status: 429 });
    }

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
    // 临时保存文件用于ffprobe
    const tempPath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(tempPath, buffer);
    const getDuration = async (filePath: string) => {
      const { execSync } = await import('node:child_process');
      try {
        const out = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`).toString();
        return Math.ceil(Number.parseFloat(out));
      } catch {
        return 0;
      }
    };
    const durationSec = await getDuration(tempPath);
    fs.unlinkSync(tempPath);
    if (durationSec > 30) {
      return new Response(JSON.stringify({ error: '免费用户每次最多处理30秒视频' }), { status: 429 });
    }
    // ====== 更新用量 ======
    usage.count += 1;
    usage.duration += durationSec;
    usageMap.set(ip, usage);

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
