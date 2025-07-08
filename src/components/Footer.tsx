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
              <li><Link href="/#home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#demo" className="text-gray-400 hover:text-white transition-colors">Demo</Link></li>
              <li><Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        {/* Right: Contact form */}
        <div className="flex-shrink-0 w-full md:w-auto md:max-w-xs" id="contact">
          <div className="mb-2 text-3xl font-extrabold text-white text-center md:text-left">Contact Us</div>
          <div className="mb-4 text-gray-300 text-base text-center md:text-left">Our team is here to help you with any questions or support you need.</div>
          <div className="mb-4 text-lg flex items-center justify-center md:justify-start" style={{ fontSize: '1.35rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
              <rect width="24" height="24" rx="6" fill="#2563eb" />
              <path d="M6 8.5L12 13L18 8.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="6" y="8" width="12" height="8" rx="2" stroke="#fff" strokeWidth="1.5" />
            </svg>
            <a href="mailto:soniceono@gmail.com" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '1.35rem', fontWeight: 600 }}>soniceono@gmail.com</a>
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
