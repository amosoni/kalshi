'use client';

import { useState } from 'react';
import { apiUrl } from '@/utils/api';
import { useUser } from '../hooks/useUser';

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

export default function UploadAndRemoveBg({ title = 'Upload Video', glass = false }: UploadAndRemoveBgProps) {
  const user = useUser();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');
  const [customColor, setCustomColor] = useState<string>('#FFFFFF');

  const handleProcess = async () => {
    if (!uploadedFile) {
      return;
    }
    setIsProcessing(true);
    setError(null);
    setProcessedVideoUrl(null);
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('background_color', selectedColor);
      if (user?.id) {
        formData.append('user_id', user.id);
      }
      // 读取 next-auth.session-token
      let sessionToken = '';
      if (typeof window !== 'undefined') {
        sessionToken = document.cookie.split('; ').find(row => row.startsWith('next-auth.session-token='))?.split('=')[1] || '';
      }
      const res = await fetch(apiUrl('/api/remove-bg'), {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {},
      });
      const data = await res.json();
      if (res.ok && data.resultUrl) {
        setProcessedVideoUrl(data.resultUrl);
      } else {
        setError(data.error || 'Failed to process video.');
      }
    } catch {
      setError('Failed to process video. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (processedVideoUrl) {
      try {
        // 对于R2存储的URL，直接使用，不需要额外的fetch
        const link = document.createElement('a');
        link.href = processedVideoUrl;
        link.download = `processed_${uploadedFile?.name || 'video.mp4'}`;
        // link.target = '_blank'; // 移除新标签页打开，确保直接下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Download failed:', error);
        // 如果直接下载失败，尝试通过代理下载
        try {
          const response = await fetch(`/api/download?url=${encodeURIComponent(processedVideoUrl)}`, {
            method: 'GET',
            credentials: 'include',
          });
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `processed_${uploadedFile?.name || 'video.mp4'}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          } else {
            alert('Download failed. Please try again.');
          }
        } catch (proxyError) {
          console.error('Proxy download also failed:', proxyError);
          alert('Download failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className="w-full flex justify-center py-12">
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
                        if (!user?.id) {
                          alert('Please sign in to upload files.');
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
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setSelectedColor(e.target.value);
                }}
                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedColor === customColor ? 'border-blue-500 scale-110' : 'border-gray-300 dark:border-gray-600'}`}
                title="Custom color"
              />
            </div>
          </div>

          {/* 生成按钮 */}
          <button
            type="button"
            onClick={() => {
              if (!user?.id) {
                // TODO: Replace with UI notification
                console.warn('Please sign in to process videos.');
                return;
              }
              handleProcess();
            }}
            disabled={!uploadedFile || isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none mb-0"
          >
            {isProcessing
              ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                )
              : (
                  'Remove Background'
                )}
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="text-red-800 dark:text-red-200">{error}</div>
            </div>
          )}
        </div>

        {/* 右卡片：生成结果与下载，仅在有结果时显示 */}
        {processedVideoUrl && (
          <div className="backdrop-blur-lg bg-white/60 rounded-3xl p-6 shadow-xl flex flex-col justify-center items-center" style={{ minHeight: 480, maxHeight: 540, height: '100%', width: 420, marginRight: 32 }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Processed Result</h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 w-full flex justify-center">
              <video
                controls
                className="w-full rounded-lg"
                src={processedVideoUrl}
                style={{ maxHeight: 180 }}
              >
                <track kind="captions" src="" label="English" />
                Your browser does not support the video tag.
              </video>
            </div>
            <button type="button" onClick={handleDownload} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 mb-2">
              Download Video
            </button>
            <button type="button" onClick={() => setProcessedVideoUrl(null)} className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl py-3 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 mb-2">
              Process Another
            </button>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-2 w-full">
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <div className="font-semibold mb-2">Processing Complete!</div>
                <div>Your video background has been successfully removed. You can now download the processed video or process another file.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
