import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar" style={{ display: 'flex', alignItems: 'center', height: 60, padding: '0 24px' }}>
      <div className="logo" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 28 Q8 20 16 18 Q24 16 34 22 Q36 23 34 28 Z" fill="#222" />
          <path d="M12 22 Q16 14 28 16 Q32 17 32 22" fill="none" stroke="#222" strokeWidth="2" />
          <circle cx="12" cy="28" r="3" fill="#222" />
          <circle cx="30" cy="28" r="3" fill="#222" />
        </svg>
      </div>
      {/* 这里可以添加你的导航内容 */}
    </nav>
  );
}
