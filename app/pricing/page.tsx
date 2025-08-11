import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import NavbarWrapper from '@/components/NavbarWrapper';
import PricingSectionWrapper from '@/components/PricingSectionWrapper';

export const metadata: Metadata = {
  title: 'Pricing - AI Video Background Removal Tool',
  description: 'Choose the perfect plan for your AI video background removal needs. Free plan with 3 credits, Basic plan for regular users, and Pro plan for professionals.',
  keywords: [
    'AI video background removal pricing',
    'video background remover cost',
    'free video background removal',
    'video editing pricing',
    'AI video processing plans',
    'background removal subscription',
  ],
  openGraph: {
    title: 'Pricing - AI Video Background Removal Tool',
    description: 'Choose the perfect plan for your AI video background removal needs. Free plan with 3 credits, Basic plan for regular users, and Pro plan for professionals.',
    url: 'https://www.kalshiai.org/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen w-full bg-gray-50">
        {/* 页面标题 */}
        <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Choose the plan that fits your needs. Start free and upgrade when you need more
            </p>
          </div>
        </section>

        {/* 定价方案 */}
        <PricingSectionWrapper />

        {/* 常见问题 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about our pricing and plans
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  What are credits and how do they work?
                </h3>
                <p className="text-gray-600">
                  Credits are our way of measuring video processing time. Each credit equals 1 minute of video processing.
                  For example, a 3-minute video requires 3 credits. New users get 3 free credits to try our service.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Can I change my plan anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately,
                  and you'll only pay the prorated difference for the current billing period.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  What happens if I exceed my plan limits?
                </h3>
                <p className="text-gray-600">
                  If you exceed your plan limits, you'll need to purchase additional credits or upgrade to a higher plan.
                  We'll notify you before you reach your limits so you can make the best decision for your needs.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service,
                  contact our support team within 30 days of your purchase for a full refund.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Is there a free trial for paid plans?
                </h3>
                <p className="text-gray-600">
                  Yes! All new users get 3 free credits to try our service. This gives you a chance to experience
                  the quality of our AI background removal before committing to a paid plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 企业定制 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Need a Custom Solution?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                For enterprise customers with specific requirements, we offer custom pricing and dedicated support.
              </p>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Enterprise Features</h3>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom API integration
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority processing queue
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom file size limits
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    SLA guarantees
                  </li>
                </ul>
                <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
