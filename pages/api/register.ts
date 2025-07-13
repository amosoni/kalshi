import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../src/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 添加 CORS 头
  res.setHeader('Access-Control-Allow-Origin', 'https://kalshiai.org');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    // 检查邮箱和用户名唯一性
    const existUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });
    if (existUser) {
      if (existUser.email === email) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      if (existUser.username === username) {
        return res.status(409).json({ error: 'Username already exists' });
      }
    }
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    // 创建用户
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ id: user.id, username: user.username, email: user.email, image: user.image });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || 'Internal server error' });
  }
}
