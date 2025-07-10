import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // 检查用户是否已存在
    const exist = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    if (exist) {
      return res.status(400).json({ error: 'User already exists' });
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
    return res.status(201).json({ success: true, user: { id: user.id, username, email } });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
