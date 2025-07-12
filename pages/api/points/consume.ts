import type { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import { getServerSession } from 'next-auth';
// import { supabase } from '@/libs/supabase';
import { authOptions } from '../../../app/api/auth/[...nextauth]/authOptions';
import { checkDeviceId } from '../../../lib/checkDeviceId';
import { verifyCaptcha } from '../../../lib/verifyCaptcha';

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
    const { captchaToken, deviceId } = req.body;
    if (!(await verifyCaptcha(captchaToken))) {
      return res.status(400).json({ error: '验证码校验失败' });
    }
    if (!(await checkDeviceId(deviceId))) {
      return res.status(429).json({ error: '设备操作过于频繁' });
    }
  }
  // 用 NextAuth session 获取 userId
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, description } = req.body;

    if (!amount || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }

    // 获取当前积分余额
    // TODO: 用 Prisma/新方案重写积分消耗逻辑
    // const { data: pointsData, error: pointsError } = await supabase
    //   .from('points')
    //   .select('balance, total_spent')
    //   .eq('user_id', user_id)
    //   .single();

    // if (pointsError) {
    //   return res.status(500).json({ error: 'Failed to fetch points' });
    // }

    // const currentBalance = pointsData?.balance || 0;

    // if (currentBalance < amount) {
    //   return res.status(400).json({
    //     error: 'Insufficient points',
    //     currentBalance,
    //     requiredAmount: amount,
    //   });
    // }

    // const newBalance = currentBalance - amount;

    // 更新积分余额
    // TODO: 用 Prisma/新方案重写积分消耗逻辑
    // const { error: updateError } = await supabase
    //   .from('points')
    //   .update({
    //     balance: newBalance,
    //     total_spent: (pointsData?.total_spent || 0) + amount,
    //     updated_at: new Date(),
    //   })
    //   .eq('user_id', user_id);

    // if (updateError) {
    //   return res.status(500).json({ error: 'Failed to update points' });
    // }

    // 记录积分流水
    // TODO: 用 Prisma/新方案重写积分消耗逻辑
    // const { error: logError } = await supabase
    //   .from('points_log')
    //   .insert({
    //     user_id,
    //     type: 'spend',
    //     amount: -amount,
    //     balance_after: newBalance,
    //     description,
    //     created_at: new Date(),
    //   });

    // if (logError) {
    //   return res.status(500).json({ error: 'Failed to log points transaction' });
    // }

    return res.status(200).json({
      success: true,
      // newBalance,
      consumedAmount: amount,
    });
  } catch (error) {
    console.error('Points consume error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
