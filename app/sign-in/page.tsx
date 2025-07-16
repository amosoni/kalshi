'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 80 }}>加载中...</div>}>
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || '';
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', marginTop: 80 }}>加载中...</div>;
  }
  if (session) {
    return (
      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <h2>已登录</h2>
        <div>
          欢迎，
          {session.user?.name || session.user?.email}
          ！
        </div>
        <Link href="/" style={{ color: '#2563eb', marginTop: 16, display: 'inline-block' }}>返回首页</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, boxShadow: '0 2px 16px #eee', borderRadius: 12 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>登录 / 注册</h2>
      {error && (
        <div style={{ color: 'red', marginBottom: 16 }}>
          登录失败：
          {error}
        </div>
      )}
      <button type="button" onClick={() => signIn('google')} style={{ width: '100%', padding: 12, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, marginBottom: 16, fontWeight: 600, fontSize: 16 }}>
        使用 Google 登录
      </button>
      <div style={{ textAlign: 'center', margin: '16px 0', color: '#888' }}>或</div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        setEmailLoading(true);
        const res = await signIn('email', { email, redirect: false });
        setEmailLoading(false);
        if (res?.ok) {
          window.location.reload(); // 登录/注册成功后强制刷新页面，确保 session 立即同步
        }
      }}
      >
        <input
          type="email"
          placeholder="输入邮箱地址"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 6, marginBottom: 12, fontSize: 15 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 15 }} disabled={emailLoading}>
          {emailLoading ? '发送中...' : '邮箱登录 / 注册'}
        </button>
      </form>
      <div style={{ color: '#888', fontSize: 13, marginTop: 16 }}>未注册用户将自动注册，邮箱登录将收到验证邮件。</div>
    </div>
  );
}
