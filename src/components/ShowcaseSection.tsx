export default function ShowcaseSection() {
  return (
    <section className="w-full py-20 flex flex-col items-center bg-white px-4 md:px-8">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-900">AI Before & After Comparison</h2>
        <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
          {['Before', 'After'].map(label => (
            <div
              key={label}
              className="flex-1 bg-white rounded-2xl shadow-xl h-64 flex items-center justify-center w-full min-w-[200px] text-2xl font-bold text-gray-400 border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
