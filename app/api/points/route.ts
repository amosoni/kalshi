import { prisma } from 'libs/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/authOptions';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://www.kalshiai.org',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,Cookie',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// 重试函数
const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<T> => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;

      // 检查是否是连接错误
      const isConnectionError = error?.code === 'P1001'
        || error?.message?.includes('Closed')
        || error?.kind === 'Closed'
        || error?.message?.includes('connection');

      if (isConnectionError && attempt < maxRetries) {
        console.warn(`Database connection error on attempt ${attempt}, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // 指数退避
        continue;
      }

      // 如果不是连接错误或者已经重试完，直接抛出
      throw error;
    }
  }

  throw lastError;
};

export async function GET() {
  // 跳过构建时
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json(null, { headers: CORS_HEADERS });
  }

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401, headers: CORS_HEADERS });
    }

    // 使用重试机制查询积分
    const points = await retryOperation(async () => {
      return await prisma.points.findUnique({ where: { user_id: userId } });
    });

    if (!points) {
      return NextResponse.json({ balance: 0, total_earned: 0, total_spent: 0 }, { headers: CORS_HEADERS });
    }

    return NextResponse.json({
      balance: points.balance,
      total_earned: points.total_earned,
      total_spent: points.total_spent,
    }, { headers: CORS_HEADERS });
  } catch (error: any) {
    console.error('Error fetching points:', error);

    // 如果是数据库连接错误，返回默认值而不是错误
    if (error?.code === 'P1001' || error?.message?.includes('Closed') || error?.kind === 'Closed') {
      console.warn('Database connection error, returning default points values');
      return NextResponse.json({ balance: 0, total_earned: 0, total_spent: 0 }, { headers: CORS_HEADERS });
    }

    return NextResponse.json({
      error: 'Failed to fetch points',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500, headers: CORS_HEADERS });
  }
}
