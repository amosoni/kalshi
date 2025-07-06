import Head from 'next/head';
import Layout from '../src/components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | kalshi ai - Remove Video Background</title>
        <meta name="description" content="Read the privacy policy for kalshi ai, the best AI tool to Remove Video Background online. Learn how we protect your data and privacy." />
        <meta name="keywords" content="kalshi ai, Remove Video Background, privacy policy, AI video editing, data protection" />
      </Head>
      <div className="max-w-3xl mx-auto bg-gray-800/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-700/20 mt-10 md:mt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-400">Privacy Policy</h1>
        <p className="mb-4 text-lg">
          Welcome to
          <b className="text-blue-300">kalshi ai</b>
          ! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our AI-powered
          <b className="text-blue-300">Remove Video Background</b>
          {' '}
          service.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">1. Information We Collect</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Email address and account information (for login and support)</li>
          <li>Uploaded videos and processing data (for providing the Remove Video Background service)</li>
          <li>Usage analytics (to improve kalshi ai and user experience)</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">2. How We Use Your Data</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>To provide and improve the Remove Video Background service</li>
          <li>To communicate with you about your account or support requests</li>
          <li>To analyze usage and enhance kalshi ai features</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">3. Data Security</h2>
        <p className="mb-4">We use industry-standard security measures to protect your data. Your videos and personal information are never shared with third parties except as required by law.</p>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">4. Cookies</h2>
        <p className="mb-4">kalshi ai uses cookies to enhance your experience and analyze site traffic. You can manage cookie preferences in your browser settings.</p>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or your data, please contact us at
          <a href="mailto:soniceono@gmail.com" className="text-blue-400 underline">soniceono@gmail.com</a>
          .
        </p>
        <p className="text-gray-500 text-xs mt-8">
          Last updated:
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </Layout>
  );
}
