'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function TestAuth() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [msg, setMsg] = useState('');

  // 注册接口
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMsg('注册中...');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });
    if (res.ok) {
      setMsg('注册成功，自动登录...');
      // 注册成功后自动登录
      const loginRes = await signIn('credentials', {
        usernameOrEmail: email || username,
        password,
        redirect: false,
      });
      if (loginRes?.ok) {
        setMsg('自动登录成功！');
        window.location.href = '/';
      } else {
        setMsg('自动登录失败');
      }
    } else {
      setMsg('注册失败');
    }
  }

  // 登录接口
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMsg('登录中...');
    const loginRes = await signIn('credentials', {
      usernameOrEmail: email || username,
      password,
      redirect: false,
    });
    if (loginRes?.ok) {
      setMsg('登录成功！');
      window.location.href = '/';
    } else {
      setMsg('登录失败');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>
        {mode === 'login' ? '登录' : '注册'}
        测试
      </h2>
      <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
        <input
          placeholder="邮箱"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          placeholder="用户名"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          placeholder="密码"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button type="submit" style={{ width: '100%', marginBottom: 8 }}>
          {mode === 'login' ? '登录' : '注册'}
        </button>
      </form>
      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ width: '100%' }}>
        切换到
        {mode === 'login' ? '注册' : '登录'}
      </button>
      <div style={{ marginTop: 16, color: 'red' }}>{msg}</div>
    </div>
  );
}
