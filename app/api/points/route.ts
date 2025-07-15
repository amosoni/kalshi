import { prisma } from 'libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/authOptions';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://kalshiai.org',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET() {
  // 跳过构建时
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json(null, { headers: CORS_HEADERS });
  }
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401, headers: CORS_HEADERS });
  }
  const points = await prisma.points.findUnique({ where: { user_id: userId } });
  if (!points) {
    return NextResponse.json({ balance: 0, total_earned: 0, total_spent: 0 }, { headers: CORS_HEADERS });
  }
  return NextResponse.json({ balance: points.balance, total_earned: points.total_earned, total_spent: points.total_spent }, { headers: CORS_HEADERS });
}
