import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

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
    const { usernameOrEmail, password } = await req.json();
    console.error('LOGIN input:', { usernameOrEmail, password });
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
    console.error('LOGIN found user:', user);
    if (!user) {
      console.error('LOGIN: user not found');
      const res = NextResponse.json({ error: 'Invalid credentials', reason: 'user_not_found' }, { status: 401 });
      res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }
    if (!user.password) {
      console.error('LOGIN: user.password is empty or null');
      const res = NextResponse.json({ error: 'Invalid credentials', reason: 'no_password' }, { status: 401 });
      res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }
    // 校验加密密码
    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, user.password);
    } catch (_e) {
      console.error('LOGIN: bcrypt.compare error:', _e, 'user.password:', user.password);
    }
    console.error('LOGIN password valid:', isValid, 'user.password:', user.password);
    if (!isValid) {
      const res = NextResponse.json({ error: 'Invalid credentials', reason: 'password_invalid' }, { status: 401 });
      res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }
    // 登录成功，返回用户信息（不含密码）
    const res = NextResponse.json({ success: true, user: { id: user.id, username: user.username, email: user.email } }, { status: 200 });
    res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  } catch (err: any) {
    console.error('LOGIN: catch error', err);
    const res = NextResponse.json({ error: err.message || 'Internal server error', reason: 'exception' }, { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', 'https://kalshiai.org');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }
}
