import type { NextRequest } from 'next/server';
import { Buffer } from 'node:buffer';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
// TODO: Supabase 相关逻辑已弃用，待替换为新存储/积分方案
// import { createClient } from '@supabase/supabase-js';
import ffprobeStatic from 'ffprobe-static';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { getServerSession } from 'next-auth';
import fetchOrig from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/libs/prisma';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export const runtime = 'nodejs';

// 移除 usageMap 和免费额度相关逻辑

const fetch = (url: any, options: any) => fetchOrig(url, options);

// TODO: Supabase 相关逻辑已弃用，待替换为新存储/积分方案
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// );

const proxyUrl = process.env.PROXY_URL; // 例：http://127.0.0.1:7899
const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://kalshiai.org',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: NextRequest) {
  // 优先从 header 读取 session token
  let sessionToken = '';
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    sessionToken = authHeader.replace('Bearer ', '').trim();
  } else {
    // 兼容 cookie 方式
    const cookie = req.headers.get('cookie') || '';
    const match = cookie.match(/next-auth\.session-token=([^;]+)/);
    if (match) {
      sessionToken = match[1];
    }
  }
  let userId = null;
  if (sessionToken) {
    // 直接查数据库 session 表
    const session = await prisma.session.findUnique({ where: { sessionToken } });
    if (session && session.userId) {
      userId = session.userId;
    }
  }
  // 兼容 getServerSession 方式（本地调试）
  if (!userId) {
    const session = await getServerSession(authOptions);
    userId = session?.user?.id;
  }
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401, headers: CORS_HEADERS });
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

    const backgroundColor = formData.get('background_color') as string || '#FFFFFF';

    console.error('ffprobeStatic.path', ffprobeStatic.path, fs.existsSync(ffprobeStatic.path));
    // ====== 检查视频时长（每次最多30秒） ======
    const tempPath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(tempPath, buffer);
    const getDuration = (filePath: string) => {
      const ffprobePath = ffprobeStatic.path;
      console.error('ffprobeStatic.path in getDuration', ffprobePath, fs.existsSync(ffprobePath));
      try {
        const out = execSync(`"${ffprobePath}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`).toString();
        return Math.ceil(Number.parseFloat(out));
      } catch (err: any) {
        console.error('ffprobe execSync error:', err.message, err.stack);
        return 0;
      }
    };
    const durationSec = getDuration(tempPath);
    fs.unlinkSync(tempPath);
    if (durationSec <= 0) {
      return new Response(JSON.stringify({ error: 'Failed to get video duration' }), { status: 400, headers: CORS_HEADERS });
    }
    if (durationSec > 30) {
      return new Response(JSON.stringify({ error: '免费用户每次最多处理30秒视频' }), { status: 429, headers: CORS_HEADERS });
    }

    // ====== Render 后端时长校验 ======
    const renderResp = await fetch('https://api.kalshiai.org/api/validate-duration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, videoDuration: durationSec }),
    });
    const text = await renderResp.text();
    console.error('remove-bg 状态码:', renderResp.status);
    console.error('remove-bg 返回内容:', text);
    let renderData;
    try {
      renderData = JSON.parse(text) as { valid: boolean; reason?: string };
    } catch (_error) {
      return new Response(JSON.stringify({ error: '视频处理接口返回非JSON内容' }), { status: 500 });
    }
    if (!renderData.valid) {
      return new Response(JSON.stringify({ error: renderData.reason || '视频时长校验失败' }), { status: 429, headers: CORS_HEADERS });
    }

    // ====== 积分校验 ======
    // 积分校验
    const userPoints = await prisma.points.findUnique({ where: { user_id: userId } });
    const currentBalance = userPoints?.balance || 0;
    const cost = durationSec / 60;
    if (currentBalance < cost) {
      return new Response(JSON.stringify({ error: 'Insufficient points', currentBalance, requiredAmount: cost }), { status: 403, headers: CORS_HEADERS });
    }
    // 本地存储上传
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
    fs.writeFileSync(uploadPath, buffer);
    const fileUrl = `/uploads/${fileName}`;

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
      await prisma.points.update({ where: { user_id: userId }, data: { balance: { decrement: cost } } });
      return new Response(JSON.stringify({ resultUrl: result.output }), { status: 200, headers: CORS_HEADERS });
    } else {
      console.error('AI处理失败:', result);
      return new Response(JSON.stringify({ error: 'AI处理失败' }), { status: 500, headers: CORS_HEADERS });
    }
  } catch (err: any) {
    console.error('remove-bg error:', err);
    return new Response(JSON.stringify({ error: '服务器异常', detail: String(err) }), { status: 500, headers: CORS_HEADERS });
  }
}
