'use client';
import { useRef, useState } from 'react';

export default function UploadVideoRemoveBg() {
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file));
      setLoading(true);
      // 模拟AI处理
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <section className="w-full flex flex-col items-center py-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400">
      <div className="bg-gray-900/80 rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-xl w-full">
        <h3 className="text-2xl font-bold text-white mb-4">体验AI视频去背景</h3>
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={inputRef}
          onChange={handleUpload}
        />
        <button
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition mb-4"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          上传视频
        </button>
        {preview && (
          <video src={preview} controls className="rounded-lg w-full mb-4">
            <track kind="captions" />
          </video>
        )}
        {loading && (
          <div className="text-white">AI处理中，请稍候...</div>
        )}
        {!loading && video && (
          <div className="text-green-400 font-semibold">去背景成功！（演示）</div>
        )}
      </div>
    </section>
  );
}
