import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../src/libs/supabase';

const REGISTER_REWARD = 3.00; // 注册奖励积分数，3分钟

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body;
    // Clerk user.created webhook 事件格式
    const user_id = event.data?.id;
    const email = event.data?.email_addresses?.[0]?.email_address || '';
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
    }
    // 检查是否已发放过奖励
    const { data: pointsData } = await supabase
      .from('points')
      .select('user_id')
      .eq('user_id', user_id)
      .single();
    if (!pointsData) {
      // 发放注册奖励
      await supabase.from('points').insert({
        user_id,
        balance: REGISTER_REWARD,
        total_earned: REGISTER_REWARD,
        total_spent: 0,
      });
      await supabase.from('points_log').insert({
        user_id,
        type: 'register_reward',
        amount: REGISTER_REWARD,
        balance_after: REGISTER_REWARD,
        description: '注册奖励',
        metadata: JSON.stringify({ email }),
        created_at: new Date(),
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Clerk user.created webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
