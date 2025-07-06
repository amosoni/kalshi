import React from 'react';
import Layout from '../src/components/Layout';

export default function Tutorials() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-gray-800/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-700/20 min-h-screen mt-10 md:mt-16 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-400">Tutorials</h1>
        <p className="mb-4 text-lg">Tutorials are coming soon. Stay tuned!</p>
        <p className="text-gray-500 text-xs mt-8">
          Last updated:
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </Layout>
  );
}
