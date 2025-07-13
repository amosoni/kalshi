import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // 检查用户是否已存在
    const exist = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    if (exist) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    // 创建用户
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    // 注册赠送积分
    await prisma.points.create({
      data: { user_id: user.id, balance: 100, total_earned: 100, total_spent: 0 },
    });
    await prisma.pointsLog.create({
      data: { user_id: user.id, type: 'register', amount: 100, balance_after: 100 },
    });
    return NextResponse.json({ success: true, user: { id: user.id, username, email } }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
