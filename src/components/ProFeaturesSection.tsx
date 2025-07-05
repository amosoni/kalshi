export default function ProFeaturesSection() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 px-4 md:px-8" id="pro">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-white">Unleash Pro Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full list-disc pl-5">
          {[
            'No watermark, HD & 4K export',
            'API access for developers',
            'Batch video processing',
            'Longer videos & more free quota',
            'Data security & auto file cleanup',
            'Priority support & custom solutions',
          ].map(item => (
            <li
              key={item}
              className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl ring-1 ring-blue-400/10 rounded-2xl p-6 mb-2 text-white relative overflow-hidden group flex items-center"
            >
              <span className="relative z-10 group-hover:scale-110 transition-transform duration-300 text-white">{item}</span>
            </li>
          ))}
        </ul>
        <button className="mt-10 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-pink-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400" type="button">
          View Pro Plans
        </button>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 rounded-full my-12" />
    </section>
  );
}
