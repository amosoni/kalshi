import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/libs/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test Supabase connection by querying the counter table
    const { data, error } = await supabase
      .from('counter')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        error: 'Database connection failed',
        details: error.message,
      });
    }

    return res.status(200).json({
      message: 'Supabase connection successful',
      data: data || [],
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
