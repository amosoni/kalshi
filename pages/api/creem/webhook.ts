import type { NextApiRequest, NextApiResponse } from 'next';
import { CREEM_PRODUCT_CONFIG } from '@/constants/creemProducts';
import { prisma } from '@/libs/prisma';
// TODO: Supabase 相关订单和积分逻辑已弃用，待替换为新数据库方案
// import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body;
    if (event.type !== 'checkout.succeeded') {
      return res.status(200).json({ received: true });
    }
    const { metadata, product_id, id: checkout_id } = event.data || {};
    const user_id = metadata?.user_id;
    if (!user_id || !product_id) {
      return res.status(400).json({ error: 'Missing user_id or product_id' });
    }
    const config = CREEM_PRODUCT_CONFIG[product_id];
    if (!config) {
      return res.status(400).json({ error: 'Unknown product_id' });
    }
    // 1. 更新订单状态
    // await supabase.from('orders')
    //   .update({ status: 'paid' })
    //   .eq('user_id', user_id)
    //   .eq('stripe_session_id', checkout_id);
    // 2. 给用户加分钟数
    // await supabase.rpc('add_points', { user_id, amount: config.minutes });
    // 更新订单状态
    await prisma.orders.update({
      where: {
        user_id_stripe_session_id: {
          user_id,
          stripe_session_id: checkout_id,
        },
      },
      data: { status: 'paid' },
    });
    // 增加积分（假设 Points 有 balance 字段）
    await prisma.points.update({ where: { user_id }, data: { balance: { increment: config.minutes } } });
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Creem webhook error:', error);
    return res.status(500).json({ error: 'Webhook error' });
  }
}
