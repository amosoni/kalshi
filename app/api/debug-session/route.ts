import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET(req: NextRequest) {
  // 1. 打印原始 Cookie
  const cookie = req.headers.get('cookie') || '';
  // 2. 尝试获取 session
  const session = await getServerSession(authOptions);

  // 3. 返回所有关键信息
  return NextResponse.json({
    url: req.nextUrl.href,
    cookies: cookie,
    session,
    sessionUser: session?.user || null,
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '***' : undefined,
      NODE_ENV: process.env.NODE_ENV,
    },
    headers: {
      'host': req.headers.get('host'),
      'origin': req.headers.get('origin'),
      'referer': req.headers.get('referer'),
      'user-agent': req.headers.get('user-agent'),
    },
  });
}
