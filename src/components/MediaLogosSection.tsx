export default function MediaLogosSection() {
  return (
    <section className="w-full py-12 flex flex-col items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 px-4 md:px-8">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">媒体报道</h2>
        <div className="flex flex-wrap gap-8 justify-center items-center w-full">
          {/* 可替换为真实Logo图片 */}
          <span className="text-white text-lg font-semibold">TechCrunch</span>
          <span className="text-white text-lg font-semibold">TNW</span>
          <span className="text-white text-lg font-semibold">FutureZone</span>
          <span className="text-white text-lg font-semibold">WindowsReport</span>
          <span className="text-white text-lg font-semibold">iLounge</span>
        </div>
      </div>
    </section>
  );
}
