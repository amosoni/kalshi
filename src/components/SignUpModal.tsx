import { Dialog } from '@headlessui/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignUpModal({ open, onClose, onSignIn }: { open: boolean; onClose: () => void; onSignIn: () => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: 'Invalid response' };
      }
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      setSuccess(true);
      setTimeout(async () => {
        await signIn('credentials', {
          usernameOrEmail: email.trim() || username.trim(),
          password,
          redirect: true,
          callbackUrl: '/',
        });
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center min-w-[350px]">
          <Dialog.Title className="text-xl font-bold mb-2">Create your account</Dialog.Title>
          <p className="mb-4 text-gray-500 text-sm">Welcome! Please fill in the details to get started.</p>
          <form className="w-full flex flex-col gap-3" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              className="border rounded px-4 py-2 w-full"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email address"
              className="border rounded px-4 py-2 w-full"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="border rounded px-4 py-2 w-full"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
            {success && <div className="text-green-600 text-sm mt-1">注册并登录成功，正在跳转...</div>}
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-gray-800 text-white rounded font-medium disabled:opacity-60"
              disabled={loading || success}
            >
              {loading ? 'Registering...' : 'Continue'}
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            Already have an account?
            {' '}
            <button className="text-blue-600 hover:underline" type="button" onClick={onSignIn}>
              Sign in
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
