'use client';

import { useState } from 'react';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Content Creator',
      company: 'YouTube',
      image: '/api/placeholder/60/60',
      content: 'This tool is amazing! Upload a video, pick a background color, and get results in seconds. Super easy! The AI is accurate and fast, even with large files. Saved me tons of editing time!',
    },
    {
      name: 'Emily Johnson',
      role: 'Video Editor',
      company: 'Creative Studio',
      image: '/api/placeholder/60/60',
      content: 'As a professional editor, I\'m impressed by the AI\'s precision and speed. It handles complex backgrounds better than any tool I\'ve used.',
    },
    {
      name: 'Michael Lee',
      role: 'Marketing Director',
      company: 'Tech Company',
      image: '/api/placeholder/60/60',
      content: 'We use it for all our product videos. The quality is excellent and it saves us thousands in post-production costs. Highly recommended!',
    },
    {
      name: 'Sophia Chen',
      role: 'Entrepreneur',
      company: 'Startup',
      image: '/api/placeholder/60/60',
      content: 'Perfect for our startup\'s marketing videos. Fast, reliable, and professional results. It\'s become an essential part of our toolkit.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-2 text-lg font-semibold text-blue-400">Loved by Content Creators</span>
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-300">Hear from creators and professionals who use our AI video background removal tool every day.</p>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="relative">
              {/* Testimonial Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className={`bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      index === activeIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setActiveIndex(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {testimonial.role}
                          {' '}
                          @
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      "
                      {testimonial.content}
                      "
                    </p>
                    <div className="flex items-center mt-4">
                      {[...Array.from({ length: 5 })].map((_, i) => (
                        <svg
                          key={`star-${i}`}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Free Trial</div>
                  <div className="text-gray-600 dark:text-gray-300">3 times per day</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Fast Processing</div>
                  <div className="text-gray-600 dark:text-gray-300">Completed in 30 seconds</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Multi-color Support</div>
                  <div className="text-gray-600 dark:text-gray-300">6 background colors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
