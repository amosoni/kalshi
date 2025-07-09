/* eslint-disable vars-on-top */
import type { NextApiRequest, NextApiResponse } from 'next';

declare global {
  var mockUsers: any[] | undefined;
}

// 内存用户表，仅开发用
const users: any[] = globalThis.mockUsers || [];
globalThis.mockUsers = users;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }
  const user = {
    id: users.length + 1,
    username,
    email,
    password, // 仅开发用，生产环境请加密！
    image: null,
  };
  users.push(user);
  // 注册成功后，自动请求 Render 后端 /api/bonus
  const renderResp = await fetch('https://kalshi-7z8f.onrender.com/api/bonus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id }),
  });
  const renderData = await renderResp.json();
  if (renderData.success && renderData.bonus) {
    // 发放积分逻辑（如写入 Supabase 积分表）
    // 例如：await supabase.from('points').update({ balance: ... })
  }
  return res.status(201).json({ id: user.id, username: user.username, email: user.email, image: user.image });
}
