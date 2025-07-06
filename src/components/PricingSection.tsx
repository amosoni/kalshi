'use client';

import { useState } from 'react';
import { CREEM_PRODUCT_CONFIG, CREEM_PRODUCTS } from '../constants/creemProducts';
import { useRecharge } from '../hooks/usePoints';

const CREEM_PACKAGES = [
  {
    key: 'studio_120min',
    name: 'Studio',
    product_id: CREEM_PRODUCTS.studio_120min!,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.studio_120min!]?.price ?? 0,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.studio_120min!]?.minutes ?? 0,
  },
  {
    key: 'creator_45min',
    name: 'Creator',
    product_id: CREEM_PRODUCTS.creator_45min!,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.creator_45min!]?.price ?? 0,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.creator_45min!]?.minutes ?? 0,
  },
  {
    key: 'pro_15min',
    name: 'Pro',
    product_id: CREEM_PRODUCTS.pro_15min!,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.pro_15min!]?.price ?? 0,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.pro_15min!]?.minutes ?? 0,
  },
  {
    key: 'starter_5min',
    name: 'Starter',
    product_id: CREEM_PRODUCTS.starter_5min!,
    price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.starter_5min!]?.price ?? 0,
    minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.starter_5min!]?.minutes ?? 0,
  },
] as const;
const PAYG_PACKAGE = {
  key: 'payg_2min',
  name: 'Pay as you go',
  product_id: CREEM_PRODUCTS.payg_2min!,
  price: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.payg_2min!]?.price ?? 0,
  minutes: CREEM_PRODUCT_CONFIG[CREEM_PRODUCTS.payg_2min!]?.minutes ?? 0,
} as const;

export default function PricingSection() {
  const { recharge, loading } = useRecharge();
  const [selected, setSelected] = useState<string>(CREEM_PACKAGES[1].key); // Default: Creator

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Subscription Plans */}
        <div className="flex-1 bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
          <div className="text-blue-400 text-lg mb-6">Pay as you go, more minutes, lower price</div>
          <div className="space-y-3 mb-6">
            {CREEM_PACKAGES.map(pkg => (
              <label key={pkg.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={selected === pkg.key}
                  onChange={() => setSelected(pkg.key)}
                  className="accent-blue-500"
                />
                <span className="font-semibold">{pkg.name}</span>
                <span className="text-gray-400">
                  ¥
                  {pkg.price}
                  {' '}
                  /
                  {pkg.minutes}
                  {' '}
                  min = ¥
                  {(pkg.price / pkg.minutes).toFixed(2)}
                  /min
                </span>
              </label>
            ))}
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold mt-4 transition"
            onClick={() => {
              const pkg = CREEM_PACKAGES.find(p => p.key === selected);
              if (pkg) {
                recharge(pkg.product_id);
              }
            }}
            disabled={loading}
          >
            Subscribe Now
          </button>
          <div className="text-xs text-gray-400 mt-4">
            Minutes are credited instantly. Multiple packages can be stacked.
            <br />
            14-day money-back guarantee.
          </div>
        </div>
        {/* Pay as you go */}
        <div className="flex-1 bg-gray-800 rounded-lg p-8 shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Pay as you go</h2>
          <div className="text-blue-400 text-3xl font-bold mb-2">
            ¥
            {PAYG_PACKAGE.price}
          </div>
          <div className="text-gray-300 mb-2">
            {PAYG_PACKAGE.minutes}
            {' '}
            min
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-bold mt-2 transition"
            onClick={() => recharge(PAYG_PACKAGE.product_id)}
            disabled={loading}
          >
            Buy Now
          </button>
          <div className="text-xs text-gray-400 mt-4 text-center">
            No subscription required. Buy as needed.
            <br />
            Ideal for trial or small usage.
          </div>
        </div>
        {/* Free Trial */}
        <div className="flex-1 bg-gray-700 rounded-lg p-8 shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Free Trial</h2>
          <div className="text-3xl font-bold text-white mb-2">Free</div>
          <ul className="mb-4 text-gray-200 text-sm space-y-1">
            <li>3 free uses per day</li>
            <li>Up to 30 seconds per video</li>
            <li>720p resolution</li>
            <li>Basic AI processing</li>
            <li>Watermark included</li>
          </ul>
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-6 rounded-lg font-bold opacity-60 cursor-not-allowed"
            disabled
          >
            Activated
          </button>
        </div>
      </div>
    </section>
  );
}
