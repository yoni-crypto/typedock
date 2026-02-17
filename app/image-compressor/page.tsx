'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';

export default function ImageCompressorPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      setOriginalImage(dataUrl);
      await compressImage(dataUrl, quality);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = async (dataUrl: string, qual: number) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve();
          return;
        }

        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              const reader = new FileReader();
              reader.onload = () => {
                setCompressedImage(reader.result as string);
                resolve();
              };
              reader.readAsDataURL(blob);
            } else {
              resolve();
            }
          },
          'image/jpeg',
          qual / 100
        );
      };
      img.src = dataUrl;
    });
  };

  const handleQualityChange = async (newQuality: number) => {
    setQuality(newQuality);
    if (originalImage) {
      setLoading(true);
      await compressImage(originalImage, newQuality);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    
    const a = document.createElement('a');
    a.href = compressedImage;
    a.download = 'compressed-image.jpg';
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const savings = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0;

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Original Image</span>
            <label className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer">
              Upload Image
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {originalImage ? (
              <div className="space-y-4">
                <img src={originalImage} alt="Original" className="max-w-full h-auto border border-stone-300 dark:border-stone-700 rounded" />
                <div className="text-sm text-stone-600 dark:text-stone-400">
                  Size: {formatSize(originalSize)}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-stone-500 dark:text-stone-400">
                Upload an image to compress
              </div>
            )}
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Compressed Image</span>
            {compressedImage && (
              <button
                onClick={handleDownload}
                className="px-2 py-0.5 text-xs rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                Download
              </button>
            )}
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full text-sm text-stone-500 dark:text-stone-400">
                Compressing...
              </div>
            ) : compressedImage ? (
              <div className="space-y-4">
                <img src={compressedImage} alt="Compressed" className="max-w-full h-auto border border-stone-300 dark:border-stone-700 rounded" />
                <div className="space-y-2">
                  <div className="text-sm text-stone-600 dark:text-stone-400">
                    Size: {formatSize(compressedSize)}
                  </div>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    Saved: {savings}% ({formatSize(originalSize - compressedSize)})
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-stone-500 dark:text-stone-400">
                Compressed image will appear here
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
