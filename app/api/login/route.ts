import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { usernameOrEmail, password } = await req.json();
    if (!usernameOrEmail || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });
    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    // 校验加密密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    // 登录成功，返回用户信息（不含密码）
    return NextResponse.json({ success: true, user: { id: user.id, username: user.username, email: user.email } }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
