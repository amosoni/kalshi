import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import NavbarWrapper from '@/components/NavbarWrapper';

export const metadata: Metadata = {
  title: 'FAQ - AI Video Background Removal Tool',
  description: 'Find answers to frequently asked questions about Kalshi AI video background removal tool. Learn about features, pricing, and how to use our service.',
  keywords: [
    'AI video background removal FAQ',
    'video background remover questions',
    'video editing help',
    'background removal support',
    'AI video processing FAQ',
    'video background removal guide',
  ],
  openGraph: {
    title: 'FAQ - AI Video Background Removal Tool',
    description: 'Find answers to frequently asked questions about Kalshi AI video background removal tool. Learn about features, pricing, and how to use our service.',
    url: 'https://www.kalshiai.org/faq',
  },
};

export default function FAQPage() {
  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen w-full bg-gray-50">
        {/* 页面标题 */}
        <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to know about our AI video background removal service
            </p>
          </div>
        </section>

        {/* FAQ内容 */}
        <FAQSection />

        {/* 额外帮助信息 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Still Need Help?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
                <p className="text-gray-600 mb-4">
                  Browse our comprehensive guides and tutorials
                </p>
                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                  Browse Guides →
                </button>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Get help from our expert support team
                </p>
                <button type="button" className="text-green-600 hover:text-green-700 font-medium">
                  Contact Support →
                </button>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with us in real-time for instant help
                </p>
                <button type="button" className="text-purple-600 hover:text-purple-700 font-medium">
                  Start Chat →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 使用技巧 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pro Tips for Best Results
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these tips to get the best results from our AI background removal
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Video Quality</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use high-resolution videos (1080p or higher)</li>
                  <li>• Ensure good lighting on the subject</li>
                  <li>• Avoid very fast movements</li>
                  <li>• Use videos with clear subject-background separation</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Background Selection</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Choose backgrounds that contrast with your subject</li>
                  <li>• Solid colors work best for professional results</li>
                  <li>• Consider your final use case when selecting colors</li>
                  <li>• Test different options to find the perfect match</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">File Preparation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use supported formats: MP4, MOV, AVI</li>
                  <li>• Keep file sizes under your plan limits</li>
                  <li>• Trim unnecessary parts before processing</li>
                  <li>• Ensure stable internet connection during upload</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Post-Processing</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Download in the highest quality available</li>
                  <li>• Use professional video editing software for final touches</li>
                  <li>• Consider adding subtle shadows for realism</li>
                  <li>• Test your final video on different backgrounds</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
