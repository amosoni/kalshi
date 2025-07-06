import React from 'react';
import Layout from '../src/components/Layout';

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-gray-800/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-700/20 min-h-screen mt-10 md:mt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-400">Contact Support</h1>
        <p className="mb-4 text-lg">If you have any questions, issues, or need help, please contact our support team. We are here to assist you!</p>
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/80 rounded-2xl p-5 shadow-xl w-full max-w-sm mx-auto text-center border border-blue-700/30 backdrop-blur-md flex flex-col items-center">
          <div className="text-gray-300 text-base mb-3 tracking-wide">Email us directly:</div>
          <a
            href="mailto:soniceono@gmail.com"
            className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-200 text-lg font-bold tracking-wide transition-colors duration-200 bg-blue-900/20 px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl whitespace-nowrap"
            style={{ letterSpacing: '0.02em', minWidth: 'fit-content' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-8 0v-4" />
            </svg>
            <span className="font-mono text-lg">soniceono@gmail.com</span>
          </a>
        </div>
        <p className="text-gray-500 text-xs mt-8">
          Last updated:
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </Layout>
  );
}
