import React from 'react';

export default function HowItWorksSection() {
  const steps = [
    { icon: '⬆️', title: 'Upload Video', desc: 'Choose the video file you want to process. Large files are supported.' },
    { icon: '🎨', title: 'Choose Background Color', desc: 'Select white, green, black, blue, pink, or a custom color.' },
    { icon: '⚡', title: 'One-Click Generate & Download', desc: 'AI processes your video in seconds. Preview and download the result.' },
  ];
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(step => (
            <div key={step.title} className="bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-700 hover:shadow-2xl transition-all duration-300">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-300 text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
