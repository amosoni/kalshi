export default function PluginSection() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 px-4 md:px-8">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-white">API & Enterprise Solutions</h2>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl ring-1 ring-blue-400/10 rounded-2xl p-8 w-full flex flex-col items-center">
          <p className="text-center max-w-2xl mb-4 text-white">
            Integrate kalshi ai background removal into your workflow via API, or contact us for custom enterprise solutions and bulk processing.
          </p>
          <button className="px-6 py-2 rounded bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-pink-400/40 transition" type="button">
            Contact Us
          </button>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 rounded-full my-12" />
    </section>
  );
}
