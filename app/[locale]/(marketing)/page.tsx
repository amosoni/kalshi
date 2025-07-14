import ContactSection from '@/components/ContactSection';
import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import UploadAndRemoveBg from '@/components/UploadAndRemoveBg';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(_props: IIndexProps) {
  return {
    title: 'Home',
    description: 'Home page',
  };
}

// 全新首页主结构，基于TailGrids Play模板设计，匹配实际功能
export default function Index(props: IIndexProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      <FeaturesSection />

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Try AI Background Removal Now
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Upload your video, choose a background color, and let AI remove the background for you.
            </p>
          </div>
          <UploadAndRemoveBg title="AI Video Background Removal Demo" glass={true} />
        </div>
      </section>

      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
