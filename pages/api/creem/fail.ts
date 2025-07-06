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

    // 更新订单状态为失败
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('stripe_session_id', session_id);

    if (updateError) {
      console.error('Failed to update order status:', updateError);
    }

    return res.status(200).json({
      success: false,
      message: 'Payment failed',
    });
  } catch (error) {
    console.error('Creem payment fail error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
