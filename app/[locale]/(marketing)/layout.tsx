import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen flex flex-col">
        {children}
      </main>
    </>
  );
}
