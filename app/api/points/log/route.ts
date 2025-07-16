import { prisma } from 'libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions';

export async function GET(_req: Request) {
  // Skip during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json([]);
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // 查询用户的积分日志，按时间倒序排列
    const logs = await prisma.pointsLog.findMany({
      where: { user_id: userId },
      orderBy: { createdAt: 'desc' },
      take: 100, // 限制返回最近100条记录
    });

    return NextResponse.json(logs);
  } catch (error: any) {
    console.error('Error fetching points log:', error);

    return NextResponse.json({
      error: 'Failed to fetch points log',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}
