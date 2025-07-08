'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does AI video background removal work?',
      answer: 'Our AI uses advanced machine learning algorithms to analyze each frame, identify the subject, and separate it from the background. It handles complex scenes, moving subjects, and various lighting conditions for professional results.',
    },
    {
      question: 'What video formats are supported?',
      answer: 'We support all major video formats, including MP4, MOV, AVI, MKV, WMV, etc. File size limits depend on your plan. Free users up to 100MB, unlimited for enterprise.',
    },
    {
      question: 'How long does processing take?',
      answer: 'Processing time depends on video length and quality. Typically, a 1-minute video takes 30-60 seconds. Our AI is optimized for both speed and quality.',
    },
    {
      question: 'Can I use a custom background image?',
      answer: 'Currently, only preset and solid/gradient background colors are supported. Uploading custom background images is not available yet.',
    },
    {
      question: 'Is my video data safe?',
      answer: 'Absolutely. We take security seriously. All uploaded videos are deleted after processing. We never store or share your content. Our servers use enterprise-grade encryption.',
    },
    {
      question: 'What are the differences between plans?',
      answer: 'The Free plan gives new users 3 free credits. Each credit = 1 minute of processing. After using up the credits, you need to recharge. Basic plan offers 30 processes per month, up to 5 minutes per video, no watermark, and advanced features. Pro plan includes unlimited processing, API access, and dedicated support.',
    },
    {
      question: 'What are the limitations for free users?',
      answer: 'New users get 3 free credits, each credit can process 1 minute of video. After using up the free credits, you need to recharge to continue using the service.',
    },
    {
      question: 'Can I process multiple videos in batch?',
      answer: 'Batch processing is not supported at the moment. You can only process one video at a time.',
    },
  ];

  return (
    <section id="faq" className="pb-8 pt-20 bg-gray-50 dark:bg-gray-800 lg:pb-[70px] lg:pt-[120px]">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
              <span className="block mb-2 text-lg font-semibold text-blue-600">
                FAQ
              </span>
              <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Here are some common questions about our AI video background removal service.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 lg:w-2/3 mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
                >
                  <button
                    type="button"
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`px-6 transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? 'max-h-96 opacity-100 pb-4'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-12 text-center bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our customer support team is here to help.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-center text-base font-medium text-white shadow-lg transition duration-300 ease-in-out hover:shadow-xl"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
