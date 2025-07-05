'use client';

import { useState } from 'react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for trying and testing',
      features: [
        '3 processes per day',
        'Up to 30 seconds per video',
        '720p resolution',
        'Basic background removal',
        'Standard support',
        'Watermark included',
      ],
      popular: false,
      buttonText: 'Try Now',
      buttonVariant: 'outline',
    },
    {
      name: 'Basic',
      price: { monthly: 29, annual: 290 },
      description: 'Ideal for content creators and professionals',
      features: [
        '30 processes per month',
        'Up to 5 minutes per video',
        '4K resolution',
        'Advanced AI processing',
        'Priority processing',
        'No watermark',
        'Custom background color',
        'Batch processing',
      ],
      popular: true,
      buttonText: 'Upgrade to Basic',
      buttonVariant: 'primary',
    },
    {
      name: 'Pro',
      price: { monthly: 99, annual: 990 },
      description: 'Best for teams and large projects',
      features: [
        'Unlimited processes',
        'Up to 30 minutes per video',
        '8K resolution',
        'API access',
        'Dedicated support',
        'Custom integration',
        'Team collaboration',
        'Advanced analytics',
        'White-label option',
      ],
      popular: false,
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'outline',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-2 text-lg font-semibold text-blue-400">Pricing</span>
          <h2 className="text-4xl font-bold mb-4">Choose the Right Plan for You</h2>
          <p className="text-gray-300">Flexible plans for individuals, creators, and teams. Upgrade anytime as your needs grow.</p>
        </div>
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                !isAnnual
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                isAnnual
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Annual
              <span className="ml-1 text-xs text-green-600">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          {plans.map((plan, index) => (
            <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className={`relative mb-12 rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-2 border-blue-500'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
              }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${
                    plan.popular ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'
                  }`}
                  >
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${
                      plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}
                    >
                      {plan.price.monthly === 0 ? 'Free' : `¥${isAnnual ? plan.price.annual : plan.price.monthly}`}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className={`text-lg ${
                        plan.popular ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'
                      }`}
                      >
                        /
                        {isAnnual ? 'Year' : 'Month'}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-3 flex-shrink-0 ${
                          plan.popular ? 'text-white' : 'text-green-500'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={`text-sm ${
                        plan.popular ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
                      }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : plan.buttonVariant === 'primary'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Have questions?
          </p>
          <a
            href="#faq"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            View FAQ →
          </a>
        </div>
      </div>
    </section>
  );
}
