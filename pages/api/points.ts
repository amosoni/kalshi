import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import rateLimit from 'express-rate-limit';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions';

const prisma = new PrismaClient();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每IP最多100次
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => {
    return (
      req.headers['x-forwarded-for']
      || req.connection?.remoteAddress
      || req.socket?.remoteAddress
      || req.ip
      || 'unknown'
    );
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await apiLimiter(req, res, () => {});
  if (req.method === 'POST') {
    // 这里可加验证码/设备校验逻辑
  }
  // 用 NextAuth session 获取 userId
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.method === 'GET') {
    // 查询积分
    let points = await prisma.points.findUnique({ where: { user_id: userId } });
    if (!points) {
      // 新用户，自动插入初始积分（3 分钟=180 秒）
      points = await prisma.points.create({
        data: { user_id: userId, balance: 180, total_earned: 180, total_spent: 0 },
      });
      await prisma.pointsLog.create({
        data: { user_id: userId, type: 'register', amount: 180, balance_after: 180, description: '注册赠送积分' },
      });
    }
    return res.status(200).json({
      balance: points.balance,
      total_earned: points.total_earned,
      total_spent: points.total_spent,
    });
  }

  if (req.method === 'POST') {
    // 增加/扣除积分
    const { amount } = req.body;
    if (typeof amount !== 'number') {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    let points = await prisma.points.findUnique({ where: { user_id: userId } });
    if (!points) {
      return res.status(404).json({ error: 'Points record not found' });
    }
    const newBalance = points.balance + amount;
    if (newBalance < 0) {
      return res.status(400).json({ error: 'Insufficient points' });
    }
    points = await prisma.points.update({
      where: { user_id: userId },
      data: {
        balance: newBalance,
        total_earned: amount > 0 ? points.total_earned + amount : points.total_earned,
        total_spent: amount < 0 ? points.total_spent - amount : points.total_spent,
      },
    });
    await prisma.pointsLog.create({
      data: {
        user_id: userId,
        type: amount > 0 ? 'earn' : 'spend',
        amount,
        balance_after: newBalance,
        description: amount > 0 ? '积分增加' : '积分消费',
      },
    });
    return res.status(200).json({ success: true, newBalance });
  }

  res.status(405).end();
}
