'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { usePoints } from '../hooks/usePoints';

const COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Black', value: '#000000' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Custom', value: '' },
];

type UploadAndRemoveBgProps = {
  title?: string;
  glass?: boolean;
};

export default function UploadAndRemoveBg({ title = 'Remove Video Background', glass = true }: UploadAndRemoveBgProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const { points, refetch: refetchPoints } = usePoints();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleProcess = async () => {
    if (!uploadedFile || !user) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 检查积分是否足够
      if (points && points.balance < 10) {
        setError('Insufficient points. You need at least 10 points to process a video.');
        setIsProcessing(false);
        return;
      }

      const formData = new FormData();
      formData.append('video', uploadedFile);
      formData.append('backgroundColor', selectedColor);

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setProcessedVideoUrl(data.videoUrl);
        setNotification({ type: 'success', message: 'Video processed successfully!' });
        refetchPoints(); // 刷新积分
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to process video');
      }
    } catch {
      setError('An error occurred while processing the video');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!processedVideoUrl) {
      return;
    }

    try {
      const response = await fetch(processedVideoUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `processed-video-${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        setNotification({ type: 'error', message: 'Download failed. Please try again.' });
      }
    } catch (proxyError) {
      console.error('Proxy download also failed:', proxyError);
      setNotification({ type: 'error', message: 'Download failed. Please try again.' });
    }
  };

  return (
    <div className="w-full flex justify-center py-12">
      {/* 通知显示 */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
        }`}
        >
          {notification.message}
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="ml-2 text-sm underline"
          >
            关闭
          </button>
        </div>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 pr-12">
        {/* 左卡片：上传与生成 */}
        <div className={`backdrop-blur-lg ${glass ? 'bg-white/20' : 'bg-white/60'} rounded-3xl p-6 shadow-xl flex flex-col justify-center items-center`} style={{ minHeight: 480, maxHeight: 540, height: '100%', width: 420 }}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {/* 上传区/预览区 */}
          <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 mb-4 w-full" style={{ minHeight: 220 }}>
            {uploadedFile && !processedVideoUrl
              ? (
                  <div className="relative">
                    <video
                      src={URL.createObjectURL(uploadedFile)}
                      controls
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
                      style={{ maxHeight: 240 }}
                    >
                      <track kind="captions" src="" label="English" />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow"
                      title="Remove video"
                    >
                      ×
                    </button>
                  </div>
                )
              : (
                  <>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        if (!user) {
                          setNotification({ type: 'error', message: 'Please sign in to upload files.' });
                          return;
                        }
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedFile(file);
                          setError(null);
                          setProcessedVideoUrl(null);
                        }
                      }}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer block" aria-label="Upload video file">
                      <div className="space-y-4">
                        <div className="text-6xl">📹</div>
                        <div className="text-xl font-semibold text-gray-900 dark:text-white">
                          Click to upload your video
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          or drag and drop files here
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          Supports MP4, MOV, AVI, MKV, WMV (max 100MB)
                        </div>
                      </div>
                    </label>
                  </>
                )}
          </div>

          {/* 背景色选择 */}
          <div className="mb-4 w-full">
            <div className="mb-2 font-medium text-gray-700 dark:text-gray-200">Background Color</div>
            <div className="flex flex-wrap gap-3 items-center">
              {COLORS.map(c => c.name !== 'Custom'
                ? (
                    <button
                      key={c.value}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c.value ? 'border-blue-500 scale-110' : 'border-gray-300 dark:border-gray-600'}`}
                      style={{ background: c.value }}
                      title={c.name}
                      onClick={() => setSelectedColor(c.value)}
                    />
                  )
                : null)}
              <input
                type="color"
                value={selectedColor}
                onChange={e => setSelectedColor(e.target.value)}
                className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                title="Custom color"
              />
            </div>
          </div>

          {/* 处理按钮 */}
          {uploadedFile && !processedVideoUrl && (
            <button
              type="button"
              onClick={handleProcess}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              {isProcessing ? 'Processing...' : 'Remove Background'}
            </button>
          )}

          {/* 下载按钮 */}
          {processedVideoUrl && (
            <button
              type="button"
              onClick={handleDownload}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Download Processed Video
            </button>
          )}

          {/* 错误显示 */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* 右卡片：说明 */}
        <div className={`backdrop-blur-lg ${glass ? 'bg-white/20' : 'bg-white/60'} rounded-3xl p-6 shadow-xl`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How it works</h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold">Upload Video</h4>
                <p className="text-sm">Upload your video file (MP4, MOV, AVI, MKV, WMV) up to 100MB</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold">AI Processing</h4>
                <p className="text-sm">Our AI will automatically detect and remove the background from your video</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold">Download Result</h4>
                <p className="text-sm">Download your processed video with the new background color</p>
              </div>
            </div>
          </div>

          {/* 积分信息 */}
          {points && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700 dark:text-blue-300">Available Points:</span>
                <span className="font-bold text-blue-900 dark:text-blue-100">{points.balance}</span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Each video processing costs 10 points
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
