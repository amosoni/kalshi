import React from 'react';
import Layout from '../src/components/Layout';

function CookiePolicySection() {
  return (
    <section id="cookies" className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-blue-300">Cookie Policy</h2>
      <p className="mb-2">
        At
        {' '}
        <b className="text-blue-400">kalshi ai</b>
        , we use cookies to enhance your experience and improve our
        {' '}
        <b className="text-blue-400">Remove Video Background</b>
        {' '}
        service. Cookies help us analyze site traffic, remember your preferences, and deliver a better, more personalized experience.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Essential cookies for site functionality</li>
        <li>Analytics cookies to understand usage and improve kalshi ai</li>
        <li>Preference cookies to remember your settings</li>
      </ul>
      <p className="mb-2">
        You can manage or disable cookies in your browser settings. By using kalshi ai, you consent to our use of cookies as described in this policy.
      </p>
      <p className="text-gray-500 text-xs mt-4">
        Last updated:
        {new Date().toLocaleDateString()}
      </p>
    </section>
  );
}

export default function FAQ() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-gray-800/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-700/20 min-h-screen mt-10 md:mt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-400">Frequently Asked Questions</h1>
        {/* 这里可以插入其它FAQ内容 */}
        <CookiePolicySection />
      </div>
    </Layout>
  );
}
