import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { videoDuration } = await req.json();
  if (videoDuration > 30) {
    return new Response(JSON.stringify({ valid: false, reason: '免费用户每次最多处理30秒视频' }), { status: 200 });
  }
  return new Response(JSON.stringify({ valid: true }), { status: 200 });
}
