import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import HeroWithUploadSectionClient from '@/components/HeroWithUploadSectionClient';
import HowItWorksSection from '@/components/HowItWorksSection';
import NavbarWrapper from '@/components/NavbarWrapper';
import PricingSectionWrapper from '@/components/PricingSectionWrapper';
import TestimonialsSection from '@/components/TestimonialsSection';
import AIFriendlyContent from '../components/AIFriendlyContent';

export default function Page() {
  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen w-full bg-gray-50">
        {/* 主要标题 - 对SEO很重要 */}
        <h1 className="sr-only">Kalshi AI - Free AI Video Background Removal Tool | Online Video Background Remover</h1>
        <h2 className="sr-only">AI Video Background Removal - Support MP4, MOV, AVI formats, quickly remove video backgrounds</h2>

        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              'name': 'Kalshi AI - Free AI Video Background Removal Tool',
              'description': 'Kalshi AI provides free AI video background removal service, supporting MP4, MOV, AVI and other formats. Quickly remove video backgrounds without downloading software.',
              'url': 'https://www.kalshiai.org',
              'mainEntity': {
                '@type': 'SoftwareApplication',
                'name': 'Kalshi AI Video Background Removal Tool',
                'applicationCategory': 'MultimediaApplication',
                'operatingSystem': 'Web Browser',
                'offers': {
                  '@type': 'Offer',
                  'price': '0',
                  'priceCurrency': 'USD',
                },
              },
              'breadcrumb': {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://www.kalshiai.org',
                  },
                ],
              },
            }),
          }}
        />

        <HeroWithUploadSectionClient />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSectionWrapper />
        <TestimonialsSection />
        <FAQSection />

        {/* AI友好的内容结构 */}
        <AIFriendlyContent />
      </main>
      <Footer />
    </>
  );
}
