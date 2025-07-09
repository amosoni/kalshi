'use client';
import { SessionProvider } from 'next-auth/react';
import PricingSection from './PricingSection';

export default function PricingSectionWrapper() {
  return (
    <SessionProvider>
      <PricingSection />
    </SessionProvider>
  );
}
