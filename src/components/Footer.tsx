'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
        {/* Left: Company info and sections */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <svg width="80" height="80" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <ellipse cx="18" cy="18" rx="10" ry="6" fill="#00CFFF" />
                <path d="M28 18 Q34 14 28 14 Q32 20 28 18 Z" fill="#00CFFF" />
                <circle cx="22" cy="18" r="1" fill="#222" />
                <path d="M18 10 Q17 6 16 10" stroke="#00CFFF" strokeWidth="2" fill="none" />
                <path d="M18 10 Q19 6 20 10" stroke="#00CFFF" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-4xl font-bold text-white">KalShi Ai</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Professional AI video background removal service. Make video editing simple and efficient with advanced machine learning technology.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Demo</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        {/* Right: Contact form */}
        <div className="flex-shrink-0 w-full md:w-auto md:max-w-xs">
          <div className="mb-4 text-blue-400 font-semibold text-center md:text-left">Need Help?</div>
          <div className="mb-2 text-2xl font-bold text-white text-center md:text-left">Contact Us</div>
          <div className="mb-4 text-gray-300 text-sm text-center md:text-left">Our team is here to help you with any questions or support you need.</div>
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/80 rounded-2xl p-5 shadow-xl w-full max-w-sm mx-auto text-center border border-blue-700/30 backdrop-blur-md flex flex-col items-center">
            <div className="text-gray-300 text-base mb-3 tracking-wide">Email us directly:</div>
            <a
              href="mailto:soniceono@gmail.com"
              className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-200 text-lg font-bold tracking-wide transition-colors duration-200 bg-blue-900/20 px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl whitespace-nowrap"
              style={{ letterSpacing: '0.02em', minWidth: 'fit-content' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-8 0v-4" />
              </svg>
              <span className="font-mono text-lg">soniceono@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm mb-4 md:mb-0">
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          kalshi.ai. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm">
          <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/faq#cookies" className="text-gray-400 hover:text-white transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
