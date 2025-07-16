import { checkDeviceId } from 'lib/checkDeviceId';
import { verifyCaptcha } from 'lib/verifyCaptcha';
import { prisma } from 'libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions';

export async function POST(req: Request) {
  // Skip during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true, consumedAmount: 0 });
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json();
  const { captchaToken, deviceId, amount, description } = body;

  if (!(await verifyCaptcha(captchaToken))) {
    return NextResponse.json({ error: '验证码校验失败' }, { status: 400 });
  }

  if (!(await checkDeviceId(deviceId))) {
    return NextResponse.json({ error: '设备操作过于频繁' }, { status: 429 });
  }

  if (!amount || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (amount <= 0) {
    return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 });
  }

  try {
    // 使用事务确保数据一致性
    const result = await prisma.$transaction(async (tx) => {
      // 获取用户当前积分
      const currentPoints = await tx.points.findUnique({
        where: { user_id: userId },
      });

      if (!currentPoints) {
        throw new Error('User points record not found');
      }

      if (currentPoints.balance < amount) {
        throw new Error('Insufficient points');
      }

      // 更新积分
      const updatedPoints = await tx.points.update({
        where: { user_id: userId },
        data: {
          balance: currentPoints.balance - amount,
          total_spent: currentPoints.total_spent + amount,
        },
      });

      // 记录积分日志
      await tx.pointsLog.create({
        data: {
          user_id: userId,
          type: 'spend',
          amount: -amount, // 负数表示消耗
          balance_after: updatedPoints.balance,
          description,
        },
      });

      return updatedPoints;
    });

    return NextResponse.json({
      success: true,
      consumedAmount: amount,
      newBalance: result.balance,
    });
  } catch (error: any) {
    console.error('Error consuming points:', error);

    if (error.message === 'Insufficient points') {
      return NextResponse.json({ error: '积分不足' }, { status: 400 });
    }

    if (error.message === 'User points record not found') {
      return NextResponse.json({ error: '用户积分记录不存在' }, { status: 404 });
    }

    return NextResponse.json({
      error: 'Failed to consume points',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}
