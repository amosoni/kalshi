import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: 'Missing session_id parameter' });
    }

    // 验证 Creem 支付状态
    const creemResponse = await fetch(`https://api.creem.com/v1/orders/${session_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CREEM_API_KEY}`,
      },
    });

    if (!creemResponse.ok) {
      return res.status(400).json({ error: 'Failed to verify payment' });
    }

    const creemData = await creemResponse.json();

    if (creemData.status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // 获取订单信息
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_session_id', session_id)
      .single();

    if (orderError || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // 更新订单状态
    await supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('stripe_session_id', session_id);

    // 获取或创建用户积分记录
    const { data: pointsData, error: pointsError } = await supabase
      .from('points')
      .select('*')
      .eq('user_id', order.user_id)
      .single();

    if (pointsError && pointsError.code !== 'PGRST116') {
      return res.status(500).json({ error: 'Failed to fetch points' });
    }

    if (!pointsData) {
      // 创建新的积分记录
      const { error: createError } = await supabase
        .from('points')
        .insert({
          user_id: order.user_id,
          balance: order.amount,
          total_earned: order.amount,
          total_spent: 0,
        });

      if (createError) {
        return res.status(500).json({ error: 'Failed to create points record' });
      }
    } else {
      // 更新现有积分记录
      const { error: updateError } = await supabase
        .from('points')
        .update({
          balance: pointsData.balance + order.amount,
          total_earned: pointsData.total_earned + order.amount,
          updated_at: new Date(),
        })
        .eq('user_id', order.user_id);

      if (updateError) {
        return res.status(500).json({ error: 'Failed to update points' });
      }
    }

    // 记录积分流水
    const newBalance = pointsData ? pointsData.balance + order.amount : order.amount;
    await supabase
      .from('points_log')
      .insert({
        user_id: order.user_id,
        type: 'recharge',
        amount: order.amount,
        balance_after: newBalance,
        description: `充值 ${order.amount} 积分`,
        metadata: JSON.stringify({ order_id: order.id, session_id }),
        created_at: new Date(),
      });

    return res.status(200).json({
      success: true,
      message: 'Payment successful',
      pointsAdded: order.amount,
      newBalance,
    });
  } catch (error) {
    console.error('Creem payment success error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
