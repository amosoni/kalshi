import type { ReactNode } from 'react';
import NavbarWrapper from '@/components/NavbarWrapper';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavbarWrapper />
      <main className="w-full min-h-screen flex flex-col">
        {children}
      </main>
    </>
  );
}
