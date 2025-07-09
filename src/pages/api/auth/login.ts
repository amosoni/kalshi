import type { NextApiRequest, NextApiResponse } from 'next';

// 复用注册 API 的内存用户表
// eslint-disable-next-line no-var
var mockUsers = (globalThis as any).mockUsers as any[] || [];
(globalThis as any).mockUsers = mockUsers;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { usernameOrEmail, password } = req.body;
  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const user = mockUsers.find(u => (u.email === usernameOrEmail || u.username === usernameOrEmail) && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username/email or password' });
  }
  return res.status(200).json({ id: user.id, username: user.username, email: user.email, image: user.image });
}
