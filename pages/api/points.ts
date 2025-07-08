import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import rateLimit from 'express-rate-limit';
import { checkDeviceId } from '../../lib/checkDeviceId';
import { verifyCaptcha } from '../../lib/verifyCaptcha';
import { supabase } from '../../src/libs/supabase';

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
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const user_id = userId;
  // console.log('DEBUG: user_id', user_id);
  // console.log('DEBUG: SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
  // console.log('DEBUG: SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'not set');

  if (req.method === 'GET') {
    // 查询积分
    const { data, error } = await supabase
      .from('points')
      .select('balance, total_earned, total_spent')
      .eq('user_id', user_id)
      .single();
    if (error && error.code !== 'PGRST116') {
      console.error('Supabase SELECT error:', error);
      return res.status(500).json({ error: error.message });
    }
    if (!data) {
      // 新用户，自动插入初始积分
      const { error: insertError } = await supabase
        .from('points')
        .insert({ user_id, balance: 0, total_earned: 0, total_spent: 0 });
      if (insertError) {
        if (insertError.code === '23505') { // 主键冲突
          // 再查一次并返回已有数据
          const { data: existData, error: existError } = await supabase
            .from('points')
            .select('balance, total_earned, total_spent')
            .eq('user_id', user_id)
            .single();
          if (existError) {
            return res.status(500).json({ error: existError.message });
          }
          return res.status(200).json({
            balance: existData.balance ?? 0,
            total_earned: existData.total_earned ?? 0,
            total_spent: existData.total_spent ?? 0,
          });
        }
        console.error('Supabase INSERT error:', insertError);
        return res.status(500).json({ error: insertError.message });
      }
      return res.status(200).json({ balance: 0, total_earned: 0, total_spent: 0 });
    }
    return res.status(200).json({
      balance: data.balance ?? 0,
      total_earned: data.total_earned ?? 0,
      total_spent: data.total_spent ?? 0,
    });
  }

  if (req.method === 'POST') {
    // 增加/扣除积分
    const { amount } = req.body;
    // 这里假设有 change_points 的 Supabase function
    const { error } = await supabase.rpc('change_points', { user_id, amount });
    if (error) {
      console.error('Supabase RPC error:', error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
