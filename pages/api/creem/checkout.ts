import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetchOrig from 'node-fetch';
import { CREEM_PRODUCT_CONFIG } from '@/constants/creemProducts';
import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { product_id } = req.body;
    if (!product_id) {
      return res.status(400).json({ error: 'Missing product_id' });
    }

    const proxyUrl = process.env.PROXY_URL;
    const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

    const fetch = (url: any, options: any) => fetchOrig(url, options);

    const response = await fetch('https://api.creem.io/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CREEM_API_KEY!,
      },
      body: JSON.stringify({
        product_id,
        metadata: { user_id: userId },
      }),
      agent,
    });

    if (!response.ok) {
      const error = await response.json() as { message?: string };
      throw new Error(error.message || 'Failed to create Creem checkout');
    }

    const data = await response.json() as {
      checkout_id?: string;
      session_id?: string;
      id?: string;
      checkout_url?: string;
    };
    const config = CREEM_PRODUCT_CONFIG[product_id] || { minutes: 0, price: 0 };

    await supabase.from('orders').insert({
      user_id: userId,
      stripe_session_id: data.checkout_id || data.session_id || data.id,
      amount: config.minutes,
      price: config.price,
      status: 'pending',
    });

    return res.status(200).json({ url: data.checkout_url });
  } catch (error) {
    console.error('Creem checkout error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
