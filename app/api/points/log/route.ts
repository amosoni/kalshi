import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions';

export async function GET(_req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  // TODO: 用 Prisma/新方案重写积分日志查询逻辑
  return NextResponse.json([]);
}
