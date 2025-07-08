import Head from 'next/head';
import Layout from '../src/components/Layout';

export default function TermsOfService() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service | kalshi ai - Remove Video Background</title>
        <meta name="description" content="Read the terms of service for kalshi ai, the best AI tool to Remove Video Background online. Understand your rights and responsibilities." />
        <meta name="keywords" content="kalshi ai, Remove Video Background, terms of service, AI video editing, user agreement" />
      </Head>
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 mt-10 md:mt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-400">Terms of Service</h1>
        <p className="mb-4 text-lg">
          Welcome to
          <b className="text-blue-300">kalshi ai</b>
          ! By using our
          <b className="text-blue-300">Remove Video Background</b>
          {' '}
          service, you agree to the following terms and conditions. Please read them carefully.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">1. Service Description</h2>
        <p className="mb-4">kalshi ai provides an AI-powered online tool to Remove Video Background from your videos quickly and easily.</p>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">2. User Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Do not upload illegal, harmful, or copyrighted content without permission.</li>
          <li>Use kalshi ai and Remove Video Background service for lawful purposes only.</li>
          <li>Respect the intellectual property rights of others.</li>
        </ul>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">3. Limitation of Liability</h2>
        <p className="mb-4">kalshi ai is provided "as is" without warranties of any kind. We are not liable for any damages resulting from the use of the Remove Video Background service.</p>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">4. Changes to Terms</h2>
        <p className="mb-4">We may update these Terms of Service at any time. Continued use of kalshi ai after changes means you accept the new terms.</p>
        <h2 className="text-xl font-bold mt-8 mb-2 text-blue-300">5. Contact</h2>
        <p className="mb-4">
          For questions about these terms, contact us at
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
