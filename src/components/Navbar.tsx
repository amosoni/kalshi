'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className={`fixed top-0 left-0 z-40 flex items-center w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}
    >
      <div className="container px-4 mx-auto">
        <div className="relative flex items-center justify-between -mx-4">
          {/* 左侧 Logo 区域 */}
          <div className="max-w-full px-4 w-60 flex-shrink-0">
            <Link href="/" className="block w-full py-5 flex items-center space-x-3 select-none">
              {/* 用download.svg第9行path，viewBox=0 0 1600 900，保证Logo完整显示 */}
              <span
                className="inline-block align-middle"
                style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', width: '128px', height: '128px' }}
              >
                <svg width="128" height="128" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto' }}>
                  <ellipse cx="18" cy="18" rx="10" ry="6" fill="#00CFFF" />
                  <path d="M28 18 Q34 14 28 14 Q32 20 28 18 Z" fill="#00CFFF" />
                  <circle cx="22" cy="18" r="1" fill="#222" />
                  <path d="M18 10 Q17 6 16 10" stroke="#00CFFF" stroke-width="2" fill="none" />
                  <path d="M18 10 Q19 6 20 10" stroke="#00CFFF" stroke-width="2" fill="none" />
                </svg>
              </span>
              {/* 网站名字 */}
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

          {/* 中间 菜单 区域 */}
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

          {/* 右侧按钮区域 */}
          <div className="flex items-center justify-end pr-16 lg:pr-0 flex-shrink-0">
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href="#pricing"
                className={`px-4 py-2 text-base font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    : 'text-white hover:text-white/80'
                }`}
              >
                Sign In
              </a>
              <a
                href="#pricing"
                className={`px-6 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white/20 text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
