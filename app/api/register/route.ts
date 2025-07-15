import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from 'libs/prisma';
import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://kalshiai.org',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      const res = NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }
    // 检查用户是否已存在
    const exist = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    if (exist) {
      const res = NextResponse.json({ error: 'User already exists' }, { status: 400 });
      res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    // 创建用户
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    // 注册赠送积分
    await prisma.points.create({
      data: { user_id: user.id, balance: 180, total_earned: 180, total_spent: 0 },
    });
    await prisma.pointsLog.create({
      data: { user_id: user.id, type: 'register', amount: 180, balance_after: 180 },
    });
    const res = NextResponse.json({ success: true, user: { id: user.id, username, email } }, { status: 201 });
    res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (err: any) {
    const res = NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
