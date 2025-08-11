import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import HowItWorksSection from '@/components/HowItWorksSection';
import NavbarWrapper from '@/components/NavbarWrapper';

export const metadata: Metadata = {
  title: 'How It Works - AI Video Background Removal Tool',
  description: 'Learn how Kalshi AI video background removal works. Simple 3-step process: upload, AI processing, download. Advanced machine learning for professional results.',
  keywords: [
    'how AI video background removal works',
    'video background removal process',
    'AI video processing steps',
    'machine learning video editing',
    'background removal technology',
    'video editing workflow',
  ],
  openGraph: {
    title: 'How It Works - AI Video Background Removal Tool',
    description: 'Learn how Kalshi AI video background removal works. Simple 3-step process: upload, AI processing, download. Advanced machine learning for professional results.',
    url: 'https://www.kalshiai.org/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <NavbarWrapper />
      <main className="min-h-screen w-full bg-gray-50">
        {/* 页面标题 */}
        <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover the magic behind our AI-powered video background removal technology
            </p>
          </div>
        </section>

        {/* 工作原理 */}
        <HowItWorksSection />

        {/* 技术深度解析 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Technology Behind the Magic
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI uses cutting-edge machine learning algorithms to deliver professional-quality results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Computer Vision & AI</h3>
                <p className="text-gray-600 mb-4">
                  Our system employs advanced computer vision algorithms that can identify and separate subjects
                  from backgrounds with remarkable accuracy. The AI has been trained on millions of video frames
                  to understand complex visual patterns.
                </p>
                <p className="text-gray-600 mb-4">
                  Using deep learning neural networks, our system can handle various scenarios including:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Complex backgrounds with multiple objects</li>
                  <li>• Moving subjects and dynamic scenes</li>
                  <li>• Various lighting conditions</li>
                  <li>• Different video resolutions and formats</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Frame-by-Frame Processing</h3>
                <p className="text-gray-600 mb-4">
                  Each video is processed frame by frame, ensuring consistent quality throughout the entire video.
                  Our AI maintains temporal consistency, meaning the background removal remains stable across frames.
                </p>
                <p className="text-gray-600 mb-4">
                  The system automatically detects:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Subject boundaries and edges</li>
                  <li>• Motion and movement patterns</li>
                  <li>• Color and contrast differences</li>
                  <li>• Temporal coherence between frames</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 处理步骤详解 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Detailed Process Breakdown
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every step is optimized for speed, quality, and user experience
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Video Analysis & Preparation</h3>
                  <p className="text-gray-600 mb-3">
                    When you upload a video, our system first analyzes the file format, resolution, and duration.
                    The video is then prepared for processing by converting it to the optimal format for our AI algorithms.
                  </p>
                  <p className="text-gray-600">
                    This step ensures compatibility and sets the foundation for high-quality output.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Background Detection</h3>
                  <p className="text-gray-600 mb-3">
                    Our AI algorithms analyze each frame to identify the main subject and distinguish it from the background.
                    This involves sophisticated edge detection, motion analysis, and pattern recognition.
                  </p>
                  <p className="text-gray-600">
                    The system creates a precise mask that separates foreground from background with pixel-perfect accuracy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Background Replacement</h3>
                  <p className="text-gray-600 mb-3">
                    Once the subject is isolated, the system replaces the original background with your chosen color or gradient.
                    Advanced algorithms ensure smooth edges and natural-looking results.
                  </p>
                  <p className="text-gray-600">
                    The final video maintains the original quality while featuring your new background.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Assurance & Output</h3>
                  <p className="text-gray-600 mb-3">
                    Before delivery, our system performs quality checks to ensure consistency across all frames.
                    The processed video is then encoded in your preferred format and made available for download.
                  </p>
                  <p className="text-gray-600">
                    You receive a professional-quality video ready for use in your projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 性能优势 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Our Technology Stands Out
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Advanced features that make our AI background removal superior to traditional methods
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Speed & Efficiency</h3>
                <p className="text-gray-600">
                  Process videos in minutes, not hours. Our optimized algorithms deliver results quickly without compromising quality.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Consistent Quality</h3>
                <p className="text-gray-600">
                  Every frame is processed with the same high standard, ensuring professional results throughout your video.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Processing</h3>
                <p className="text-gray-600">
                  Your videos are processed securely and deleted immediately after processing to protect your privacy.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Learning</h3>
                <p className="text-gray-600">
                  Our AI continuously improves with each video processed, learning from new patterns and scenarios.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
                <p className="text-gray-600">
                  No technical expertise required. Our intuitive interface makes professional video editing accessible to everyone.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Multi-Platform</h3>
                <p className="text-gray-600">
                  Works on any device with a web browser. No software installation required, accessible from anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
