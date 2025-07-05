import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import HeroWithUploadSection from '@/components/HeroWithUploadSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import Navbar from '@/components/Navbar';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-gray-50">
        <h1 className="sr-only">Remove Video Background Online | kalshi ai</h1>
        <h2 className="sr-only">kalshi ai - Best AI Remove Video Background Tool</h2>
        <HeroWithUploadSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
}
