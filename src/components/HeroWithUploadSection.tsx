'use client';
import HeroSection from './HeroSection';
import UploadAndRemoveBgWrapper from './UploadAndRemoveBgWrapper';

export default function HeroWithUploadSection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-8 md:px-16 pt-24">
        {/* 左侧：主视觉区 */}
        <div className="max-w-[520px] flex flex-col items-start text-left mb-12 md:mb-0 -ml-8">
          <HeroSection />
        </div>
        {/* 右侧：上传卡片 */}
        <div className="w-full md:w-[400px] flex flex-col items-end">
          <UploadAndRemoveBgWrapper />
        </div>
      </div>
    </section>
  );
}
