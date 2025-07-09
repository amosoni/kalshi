'use client';

import { Dialog } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePoints } from '../hooks/usePoints';
import PointsBalance from './Points/PointsBalance';
import SignUpModal from './SignUpModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // 登录弹窗
  const [signUpOpen, setSignUpOpen] = useState(false); // 注册弹窗
  const sessionData = useSession();
  const session = sessionData?.data;
  const { points: _points } = usePoints();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <div className={`fixed top-0 left-0 z-50 flex items-center w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}
    >
      <div className="container px-4 mx-auto">
        <div className="relative flex items-center justify-between -mx-4">
          {/* Left Logo Area */}
          <div className="max-w-full px-4 w-60 flex-shrink-0">
            <Link href="/" className="block w-full py-5 flex items-center space-x-3 select-none">
              {/* Using download.svg line 9 path, viewBox=0 0 1600 900, ensuring complete Logo display */}
              <span
                className="inline-block align-middle"
                style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', width: '128px', height: '128px' }}
              >
                <svg width="128" height="128" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto' }}>
                  <ellipse cx="18" cy="18" rx="10" ry="6" fill="#00CFFF" />
                  <path d="M28 18 Q34 14 28 14 Q32 20 28 18 Z" fill="#00CFFF" />
                  <circle cx="22" cy="18" r="1" fill="#222" />
                  <path d="M18 10 Q17 6 16 10" stroke="#00CFFF" strokeWidth="2" fill="none" />
                  <path d="M18 10 Q19 6 20 10" stroke="#00CFFF" strokeWidth="2" fill="none" />
                </svg>
              </span>
              {/* Website Name */}
              <span className={`text-2xl font-extrabold drop-shadow-sm transition-colors ${
                isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}
              >
                KalShi AI
              </span>
              <span className={`mx-2 text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}
              >
                ·
              </span>
              <span className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}
              >
                AI Video Removal
              </span>
            </Link>
          </div>

          {/* Center Menu Area */}
          <div className="flex-1 flex justify-center items-center">
            <nav className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white dark:bg-gray-800 py-5 shadow-lg lg:static lg:block lg:w-auto lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
            >
              <ul className="block lg:flex lg:space-x-8 lg:mx-auto lg:justify-center">
                {navItems.map(item => (
                  <li key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`flex py-2 mx-8 text-base font-medium transition-colors
                        ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}
                        group-hover:text-blue-600 dark:group-hover:text-blue-400
                        lg:mx-0 lg:inline-flex lg:px-0 lg:py-6
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Button Area */}
          <div className="flex items-center justify-end pr-16 lg:pr-0 flex-shrink-0">
            <div className="hidden sm:flex items-center space-x-4">
              {session
                ? (
                    <>
                      <div className={`flex items-center space-x-2 ${
                        isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                      }`}
                      >
                        <span className="text-sm">Points:</span>
                        <PointsBalance showLabel={false} className="text-sm font-semibold" />
                      </div>
                      {/* 用户头像 */}
                      {session.user?.image && (
                        <Image
                          src={session.user.image}
                          alt="avatar"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full border border-gray-300"
                        />
                      )}
                      <span className={`px-2 text-base font-medium ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>{session.user?.email}</span>
                      <button
                        type="button"
                        className={`px-6 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                          isScrolled
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-white/20 text-white hover:bg-white hover:text-gray-900'
                        }`}
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </button>
                    </>
                  )
                : (
                    <>
                      <button
                        type="button"
                        className={`px-4 py-2 text-base font-medium transition-colors ${
                          isScrolled
                            ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                            : 'text-white hover:text-white/80'
                        }`}
                        onClick={() => setModalOpen(true)}
                      >
                        Sign In
                      </button>
                      <a
                        href="#upload"
                        className={`px-6 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                          isScrolled
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white/20 text-white hover:bg-white hover:text-gray-900'
                        }`}
                      >
                        Get Started
                      </a>
                    </>
                  )}
            </div>
            {/* NextAuth 弹窗登录 Modal */}
            <SignInModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onSignUp={() => {
                setModalOpen(false);
                setSignUpOpen(true);
              }}
            />
            <SignUpModal
              open={signUpOpen}
              onClose={() => setSignUpOpen(false)}
              onSignIn={() => {
                setSignUpOpen(false);
                setModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 新增弹窗登录组件
function SignInModal({ open, onClose, onSignUp }: { open: boolean; onClose: () => void; onSignUp: () => void }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      onClose();
      window.location.reload();
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
          <Dialog.Title className="text-lg font-bold mb-4">Sign in to KalShi AI</Dialog.Title>
          <button
            type="button"
            onClick={() => {
              onClose(); // 先关闭弹窗
              setTimeout(() => signIn('google'), 100); // 再发起 Google 登录
            }}
            className="flex items-center px-6 py-3 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all text-base font-medium mb-4"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.453 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.148s2.765-6.148 6.148-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.625c-1.711-1.57-3.922-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.695 0-.648-.07-1.148-.156-1.352z" fill="#FFC107"></path>
                <path d="M3.152 7.345l3.281 2.406c.898-1.367 2.367-2.227 4.07-2.227 1.172 0 2.242.406 3.078 1.078l2.922-2.844c-1.711-1.57-3.922-2.523-6.656-2.523-3.789 0-7.008 2.461-8.242 5.836z" fill="#FF3D00"></path>
                <path d="M23.994 12.225c0-.789-.07-1.367-.156-1.352h-9.765v3.977h5.617c-.242 1.242-1.453 3.648-5.617 3.648-2.867 0-5.242-2.016-5.953-4.672l-3.281 2.531c1.234 3.375 4.453 5.836 8.242 5.836 4.742 0 8.547-4.023 8.547-9.695z" fill="#4CAF50"></path>
                <path d="M12.07 22c2.734 0 5.047-.898 6.742-2.453l-3.219-2.625c-.898.617-2.047.977-3.523.977-2.734 0-5.047-.898-6.742-2.453l3.219-2.625c.898.617 2.047.977 3.523.977z" fill="#1976D2"></path>
              </g>
            </svg>
            Sign in with Google
          </button>
          <div className="flex items-center w-full my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <form className="w-full flex flex-col gap-3" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email address or username"
              className="border rounded px-4 py-2 w-full"
              value={usernameOrEmail}
              onChange={e => setUsernameOrEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded px-4 py-2 w-full"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-gray-800 text-white rounded font-medium disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Continue'}
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            Don’t have an account?
            {' '}
            <button className="text-blue-600 hover:underline" type="button" onClick={onSignUp}>
              Sign up
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
