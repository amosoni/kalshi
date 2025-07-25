import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { usePoints } from '../hooks/usePoints';
import { useUser } from '../hooks/useUser';
import PointsBalance from './Points/PointsBalance';

export default function AuthSection() {
  const user = useUser();
  const { points: _points } = usePoints();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  if (user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Current Points</span>
              <PointsBalance showLabel={false} className="text-lg font-bold text-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/profile';
              }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Profile
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = '/signout';
              }}
              disabled={loading}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {loading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        <p className="text-gray-600">
          {isSignUp ? 'Create a new account to get started' : 'Sign in to your account'}
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          if (isSignUp) {
            // 注册逻辑
            try {
              const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
              });
              if (!res.ok) {
                throw new Error('注册失败');
              }
              // 注册成功后自动登录
              const loginRes = await signIn('credentials', {
                usernameOrEmail: email,
                password,
                redirect: false,
              });
              if (loginRes?.ok) {
                window.location.reload(); // 登录/注册成功后强制刷新页面，确保 session 立即同步
              }
            } catch (err) {
              // 可加 setError
            } finally {
              setLoading(false);
            }
          } else {
            // 登录逻辑
            try {
              const loginRes = await signIn('credentials', {
                usernameOrEmail: email,
                password,
                redirect: false,
              });
              if (loginRes?.ok) {
                window.location.reload(); // 登录/注册成功后强制刷新页面，确保 session 立即同步
              }
            } catch (err) {
              // 可加 setError
            } finally {
              setLoading(false);
            }
          }
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {isSignUp ? 'Already have an account? Click to sign in' : 'No account? Click to sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
