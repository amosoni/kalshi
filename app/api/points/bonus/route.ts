import { prisma } from 'libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/authOptions';

export async function POST(_req: Request) {
  // Skip during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true, bonus: 0 });
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // 检查用户是否已有积分记录
    const existingPoints = await prisma.points.findUnique({
      where: { user_id: userId },
    });

    if (existingPoints) {
      return NextResponse.json({
        error: '用户已有积分记录，无法重复发放免费积分',
        currentBalance: existingPoints.balance,
      }, { status: 400 });
    }

    // 为新用户发放3个免费积分
    const newPoints = await prisma.points.create({
      data: {
        user_id: userId,
        balance: 3,
        total_earned: 3,
        total_spent: 0,
      },
    });

    // 记录积分日志
    await prisma.pointsLog.create({
      data: {
        user_id: userId,
        type: 'earn',
        amount: 3,
        balance_after: 3,
        description: '手动发放免费积分',
      },
    });

    return NextResponse.json({
      success: true,
      bonus: 3,
      newBalance: newPoints.balance,
      message: '成功发放3个免费积分',
    });
  } catch (error: any) {
    console.error('Error giving bonus points:', error);

    return NextResponse.json({
      error: 'Failed to give bonus points',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}
