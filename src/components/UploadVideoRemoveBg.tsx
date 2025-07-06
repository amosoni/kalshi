'use client';

import { useState } from 'react';

export default function UploadVideoRemoveBg() {
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file));
      setResultUrl(null);
    }
  };

  const handleGenerate = async () => {
    if (!video) {
      return;
    }
    setLoading(true);
    setResultUrl(null);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setResultUrl(URL.createObjectURL(video));
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">AI Video Background Removal</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="video-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Video
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {preview && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <video
                src={preview}
                controls
                className="w-full rounded-lg"
              >
                <track kind="captions" src="" label="English" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {video && (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Processing...' : 'Remove Background'}
            </button>
          )}

          {resultUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Result</h3>
              <video
                src={resultUrl}
                controls
                className="w-full rounded-lg"
              >
                <track kind="captions" src="" label="English" />
                Your browser does not support the video tag.
              </video>
              <a
                href={resultUrl}
                download
                className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Download Result
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
