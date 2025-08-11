import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import NavbarWrapper from '@/components/NavbarWrapper';

export const metadata: Metadata = {
  title: 'About - Kalshi AI Video Background Removal Tool',
  description: 'Learn about Kalshi AI, the team behind the revolutionary AI video background removal tool. Our mission is to make professional video editing accessible to everyone.',
  keywords: [
    'about Kalshi AI',
    'AI video background removal company',
    'video editing technology',
    'machine learning video processing',
    'Kalshi AI team',
    'video background removal mission',
  ],
  openGraph: {
    title: 'About - Kalshi AI Video Background Removal Tool',
    description: 'Learn about Kalshi AI, the team behind the revolutionary AI video background removal tool. Our mission is to make professional video editing accessible to everyone.',
    url: 'https://www.kalshiai.org/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen w-full bg-gray-50">
        {/* 页面标题 */}
        <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Kalshi AI
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing video editing with cutting-edge AI technology
            </p>
          </div>
        </section>

        {/* 公司介绍 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Kalshi AI was born from a simple observation: professional video editing was too complex,
                  too expensive, and too time-consuming for most creators and businesses. We believed that
                  everyone should have access to professional-quality video editing tools, regardless of their
                  technical expertise or budget.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                    The Problem We Solved
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Traditional video background removal required expensive software, green screens,
                    and hours of manual work. Even then, the results weren't always perfect.
                  </p>
                  <p className="text-gray-600">
                    We saw an opportunity to leverage artificial intelligence to automate this process,
                    making it faster, more accurate, and accessible to everyone.
                  </p>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Innovation</h4>
                    <p className="text-gray-600">Pioneering AI-powered video editing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 使命和愿景 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h3>
                  <p className="text-gray-600">
                    To democratize professional video editing by making advanced AI technology accessible,
                    affordable, and easy to use for creators, businesses, and individuals worldwide.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Vision</h3>
                  <p className="text-gray-600">
                    To become the leading platform for AI-powered video editing, empowering millions of
                    creators to bring their ideas to life with professional-quality results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 核心价值观 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do and every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Innovation</h3>
                <p className="text-gray-600">
                  We constantly push the boundaries of what's possible with AI technology,
                  always looking for new ways to improve our service.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality</h3>
                <p className="text-gray-600">
                  We're committed to delivering the highest quality results possible,
                  ensuring every video meets professional standards.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Accessibility</h3>
                <p className="text-gray-600">
                  We believe professional tools should be available to everyone,
                  regardless of their technical expertise or budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 技术优势 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Our Technology Stands Out
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Advanced AI algorithms combined with years of research and development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Advanced Machine Learning</h3>
                <p className="text-gray-600 mb-4">
                  Our AI models have been trained on millions of video frames, learning to recognize
                  complex patterns and handle various scenarios with remarkable accuracy.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Deep learning neural networks</li>
                  <li>• Computer vision algorithms</li>
                  <li>• Temporal consistency modeling</li>
                  <li>• Edge detection optimization</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Continuous Improvement</h3>
                <p className="text-gray-600 mb-4">
                  Our technology gets better with every video processed. We continuously update our
                  models based on user feedback and new data.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Real-time learning from user data</li>
                  <li>• Regular model updates</li>
                  <li>• Performance optimization</li>
                  <li>• New feature development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 团队介绍 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Passionate experts in AI, computer vision, and user experience design
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">AI Researchers</h3>
                <p className="text-gray-600">
                  PhD-level experts in machine learning and computer vision,
                  pushing the boundaries of what's possible with AI.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a6 6 0 000 12 6 6 0 000-12z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Software Engineers</h3>
                <p className="text-gray-600">
                  Experienced developers building scalable, reliable systems
                  that handle millions of video processing requests.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">UX Designers</h3>
                <p className="text-gray-600">
                  Creative professionals focused on making complex AI technology
                  simple and intuitive for users of all skill levels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Have questions about our technology or want to learn more?
              We'd love to hear from you.
            </p>
            <div className="space-x-4">
              <button type="button" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
                Contact Us
              </button>
              <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
