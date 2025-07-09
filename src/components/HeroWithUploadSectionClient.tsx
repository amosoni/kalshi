'use client';
import dynamic from 'next/dynamic';

const HeroWithUploadSection = dynamic(() => import('./HeroWithUploadSection'), { ssr: false });

export default function HeroWithUploadSectionClient() {
  return <HeroWithUploadSection />;
}
