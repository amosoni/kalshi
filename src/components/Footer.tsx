'use client';

import Link from 'next/link';

function ContactMiniForm() {
  return (
    <form className="bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-xs mx-auto">
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input className="w-full p-2 rounded bg-gray-700 text-white text-sm" placeholder="Name" />
        <input className="w-full p-2 rounded bg-gray-700 text-white text-sm" placeholder="Email" />
      </div>
      <input className="w-full p-2 rounded bg-gray-700 text-white text-sm mb-3" placeholder="Subject" />
      <textarea className="w-full p-2 rounded bg-gray-700 text-white text-sm mb-3" rows={3} placeholder="Message" />
      <button type="submit" className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-sm shadow-lg hover:scale-105 transition">Send</button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
        {/* 左侧：公司信息和栏目 */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <svg width="80" height="80" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <ellipse cx="18" cy="18" rx="10" ry="6" fill="#00CFFF" />
                <path d="M28 18 Q34 14 28 14 Q32 20 28 18 Z" fill="#00CFFF" />
                <circle cx="22" cy="18" r="1" fill="#222" />
                <path d="M18 10 Q17 6 16 10" stroke="#00CFFF" stroke-width="2" fill="none" />
                <path d="M18 10 Q19 6 20 10" stroke="#00CFFF" stroke-width="2" fill="none" />
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
              <li><a href="https://example.com/tutorials" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="https://api.example.com" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
              <li><a href="https://developer.example.com" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors">Developer Center</a></li>
            </ul>
          </div>
        </div>
        {/* 右侧：联系表单 */}
        <div className="flex-shrink-0 w-full md:w-auto md:max-w-xs">
          <div className="mb-4 text-blue-400 font-semibold text-center md:text-left">Need Help?</div>
          <div className="mb-2 text-2xl font-bold text-white text-center md:text-left">Contact Us</div>
          <div className="mb-4 text-gray-300 text-sm text-center md:text-left">Our team is here to help you with any questions or support you need.</div>
          <ContactMiniForm />
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
          <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
