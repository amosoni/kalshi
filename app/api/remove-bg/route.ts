import type { NextRequest } from 'next/server';
import { Buffer } from 'node:buffer';
// TODO: Supabase 相关逻辑已弃用，待替换为新存储/积分方案
// import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import fetchOrig from 'node-fetch';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export const runtime = 'nodejs';

// 移除 usageMap 和免费额度相关逻辑

const fetch = (url: any, options: any) => fetchOrig(url, options);

// TODO: Supabase 相关逻辑已弃用，待替换为新存储/积分方案
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// );

// const proxyUrl = process.env.PROXY_URL; // 例：http://127.0.0.1:7899
// const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

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
  // 获取用户认证信息
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401, headers: CORS_HEADERS });
  }

  try {
    // 解析请求数据
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const backgroundColor = formData.get('background_color') as string || '#FFFFFF';

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400, headers: CORS_HEADERS });
    }

    // 将文件数据转换为base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 直接调用Render后端处理视频
    const renderRes = await fetch('https://api.kalshiai.org/api/remove-bg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userId}`, // 传递用户ID
      },
      body: JSON.stringify({
        userId,
        fileName: file.name,
        fileSize: file.size,
        backgroundColor,
        fileData: buffer.toString('base64'), // 将文件数据编码为base64
      }),
    });

    if (!renderRes.ok) {
      const errorText = await renderRes.text();
      console.error('Render后端处理失败:', renderRes.status, errorText);
      return new Response(JSON.stringify({ error: '视频处理失败' }), { status: renderRes.status, headers: CORS_HEADERS });
    }

    const result = await renderRes.json();
    return new Response(JSON.stringify(result), { status: 200, headers: CORS_HEADERS });
  } catch (err: any) {
    console.error('remove-bg error:', err);
    return new Response(JSON.stringify({ error: '服务器异常', detail: String(err) }), { status: 500, headers: CORS_HEADERS });
  }
}
