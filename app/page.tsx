import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import HeroWithUploadSectionClient from '@/components/HeroWithUploadSectionClient';
import HowItWorksSection from '@/components/HowItWorksSection';
import NavbarWrapper from '@/components/NavbarWrapper';
import PricingSectionWrapper from '@/components/PricingSectionWrapper';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Page() {
  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen w-full bg-gray-50">
        <h1 className="sr-only">Remove Video Background Online | kalshi ai</h1>
        <h2 className="sr-only">kalshi ai - Best AI Remove Video Background Tool</h2>
        <HeroWithUploadSectionClient />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSectionWrapper />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
