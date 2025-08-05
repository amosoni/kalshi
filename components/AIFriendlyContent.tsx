import React from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

type AIFriendlyContentProps = {
  faqs?: FAQItem[];
};

const defaultFAQs: FAQItem[] = [
  {
    question: 'What video formats does Kalshi AI support?',
    answer: 'Kalshi AI supports MP4, MOV, AVI, MKV and other common video formats, with a maximum file size limit of 100MB.',
  },
  {
    question: 'How long does it take to process a video?',
    answer: 'Processing time depends on video length and complexity. Typically, a 1-minute video takes 30 seconds to 2 minutes to process.',
  },
  {
    question: 'Do I need to register an account?',
    answer: 'No registration required. You can directly upload videos for processing, completely free to use.',
  },
  {
    question: 'What is the quality of processed videos?',
    answer: 'We use advanced AI algorithms to maintain high quality of original videos while accurately removing backgrounds.',
  },
  {
    question: 'Do you support batch processing?',
    answer: 'Currently supports single video processing. We will launch batch processing feature soon.',
  },
  {
    question: 'How do I download processed videos?',
    answer: 'After processing is complete, you can directly click the download button to save the processed video to your local device.',
  },
];

export default function AIFriendlyContent({ faqs = defaultFAQs }: AIFriendlyContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 结构化FAQ数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.map(faq => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer,
              },
            })),
          }),
        }}
      />

      {/* 网站信息结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Kalshi AI',
            'url': 'https://www.kalshiai.org',
            'logo': 'https://www.kalshiai.org/logo.png',
            'description': 'Kalshi AI provides free AI video background removal service',
            'sameAs': [
              'https://twitter.com/kalshiai',
              'https://github.com/kalshiai',
            ],
            'contactPoint': {
              '@type': 'ContactPoint',
              'contactType': 'customer service',
              'availableLanguage': ['English', 'Chinese'],
            },
          }),
        }}
      />

      {/* 服务结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': 'AI Video Background Removal',
            'description': 'Use AI technology to quickly remove video backgrounds, supporting multiple video formats',
            'provider': {
              '@type': 'Organization',
              'name': 'Kalshi AI',
            },
            'areaServed': 'Worldwide',
            'serviceType': 'Video Editing',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
            },
          }),
        }}
      />

      {/* 可见的FAQ内容 */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 网站功能说明 */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Supported Formats</h3>
            <p className="text-gray-600">Supports MP4, MOV, AVI and other video formats, maximum file size 100MB</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">AI Technology</h3>
            <p className="text-gray-600">Uses advanced AI algorithms to quickly and accurately identify and remove video backgrounds</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Online Processing</h3>
            <p className="text-gray-600">No software download required, process videos directly in your browser</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Free to Use</h3>
            <p className="text-gray-600">Completely free, no registration required to use all features</p>
          </div>
        </div>
      </section>
    </div>
  );
}
