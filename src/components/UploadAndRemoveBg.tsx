'use client';
import { useRef, useState } from 'react';

const COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Black', value: '#000000' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Custom', value: '' },
];

export default function UploadAndRemoveBg({ title: _title = 'AI Video Background Removal Demo', glass: _glass = false }: { title?: string; glass?: boolean }) {
  const [, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');
  const [customColor, setCustomColor] = useState<string>('#FFFFFF');
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file));
      setResultUrl(null);
      fileRef.current = file;
    }
  };

  const handleGenerate = async () => {
    if (!fileRef.current) {
      return;
    }
    setLoading(true);
    setResultUrl(null);
    const formData = new FormData();
    formData.append('file', fileRef.current);
    formData.append('background_color', selectedColor === '' ? customColor : selectedColor);
    try {
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResultUrl(data.resultUrl);
    } catch {
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 py-8">
      {/* 左卡片：上传与生成 */}
      <div className="bg-white/70 rounded-3xl p-12 shadow-xl flex flex-col items-center max-w-lg w-full border border-pink-100/60 backdrop-blur-2xl">
        <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mb-8 drop-shadow-lg">AI Video Background Removal Demo</h3>
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={inputRef}
          onChange={handleUpload}
        />
        <button
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-xl shadow-lg hover:scale-105 transition mb-6"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          Upload Video
        </button>
        {preview && !resultUrl && (
          <>
            <video src={preview} controls className="rounded-xl w-full mb-6 shadow-md">
              <track kind="captions" />
            </video>
            <div className="flex flex-wrap gap-3 mb-6 items-center justify-center">
              {COLORS.map(c => c.name !== 'Custom'
                ? (
                    <button
                      key={c.value}
                      className={`w-10 h-10 rounded-full border-2 ${selectedColor === c.value ? 'border-pink-400 scale-110' : 'border-white/40'} transition-all`}
                      style={{ background: c.value }}
                      title={c.name}
                      onClick={() => setSelectedColor(c.value)}
                    />
                  )
                : null)}
              <input
                type="color"
                value={customColor}
                onChange={(event) => {
                  setCustomColor(event.target.value);
                  setSelectedColor('');
                }}
                className={`w-10 h-10 rounded-full border-2 ${selectedColor === '' ? 'border-pink-400 scale-110' : 'border-white/40'} cursor-pointer`}
                title="Custom color"
              />
            </div>
            <button
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-xl shadow-lg hover:scale-105 transition mb-2"
              onClick={handleGenerate}
              disabled={loading}
              type="button"
            >
              {loading ? 'Processing...' : 'Generate'}
            </button>
          </>
        )}
        {loading && (
          <div className="text-blue-600 font-semibold animate-pulse mt-4">Processing with AI, please wait...</div>
        )}
      </div>
      {/* 右卡片：生成结果与下载，仅在有结果时显示 */}
      {resultUrl && (
        <div className="bg-white/70 rounded-3xl p-12 shadow-xl flex flex-col items-center max-w-lg w-full border border-blue-100/60 backdrop-blur-2xl min-h-[340px] justify-center">
          <video src={resultUrl} controls className="rounded-xl w-full mb-6 shadow-md">
            <track kind="captions" />
          </video>
          <a
            href={resultUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            Download Result
          </a>
          <p className="mt-2 text-xs text-gray-700/70 text-center">
            If the video opens in a new tab, right-click and choose 'Save as...' to download.
          </p>
        </div>
      )}
    </section>
  );
}
