'use client';
import HeroSection from './HeroSection';
import UploadAndRemoveBg from './UploadAndRemoveBg';

export default function HeroWithUploadSection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 pt-[80px] md:pt-[100px] lg:pt-[120px] pb-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4">
        {/* 左侧：英雄区 */}
        <div className="flex-1 min-w-[320px]">
          <HeroSection />
        </div>
        {/* 右侧：上传区 */}
        <div className="flex-1 min-w-[320px] flex justify-center">
          <UploadAndRemoveBg title="AI视频去背景演示" glass={true} />
        </div>
      </div>
    </section>
  );
}
