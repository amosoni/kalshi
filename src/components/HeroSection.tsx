'use client';

const bgStyle = {
  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
};

export default function HeroSection() {
  return (
    <div id="home" className="relative overflow-hidden flex flex-col justify-center items-center h-full min-h-[420px] py-16 md:py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute inset-0" style={bgStyle} />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
        <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
          Remove Video Background Instantly
        </h1>
        <h2 className="mb-0 text-lg md:text-2xl lg:text-3xl font-medium text-white/90 max-w-2xl">
          Upload your video and let our AI remove the background in seconds. No green screen, no complex editing, just professional results.
        </h2>
      </div>
    </div>
  );
}
