import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { supabase } from '@/libs/supabase';
import { authOptions } from '../../../app/api/auth/[...nextauth]/authOptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 用 NextAuth session 获取 userId
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const user_id = userId;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id parameter' });
    }

    // 获取积分流水记录
    const { data: logs, error } = await supabase
      .from('points_log')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch points log' });
    }

    return res.status(200).json(logs || []);
  } catch (error) {
    console.error('Points log error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
