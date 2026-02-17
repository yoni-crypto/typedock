'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { encodeBase64, decodeBase64 } from '@/lib/utils/base64';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function Base64Page() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'text' | 'image'>('text');
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [stats, setStats] = useState({ chars: 0, bytes: 0 });
  const { theme } = useTheme();

  const isImageBase64 = (str: string) => {
    const cleanStr = str.replace(/^data:image\/[^;]+;base64,/, '');
    return cleanStr.startsWith('/9j/') || // JPEG
           cleanStr.startsWith('iVBORw0KGgo') || // PNG
           cleanStr.startsWith('R0lGOD') || // GIF
           cleanStr.startsWith('UklGR'); // WebP
  };

  const getImageType = (str: string) => {
    const cleanStr = str.replace(/^data:image\/[^;]+;base64,/, '');
    if (cleanStr.startsWith('/9j/')) return 'jpeg';
    if (cleanStr.startsWith('iVBORw0KGgo')) return 'png';
    if (cleanStr.startsWith('R0lGOD')) return 'gif';
    if (cleanStr.startsWith('UklGR')) return 'webp';
    return 'png';
  };

  const getCleanBase64 = (str: string) => {
    return str.replace(/^data:image\/[^;]+;base64,/, '');
  };

  useEffect(() => {
    const debouncedProcess = debounce(() => {
      setUploadedImage(null);
      
      const cleanInput = getCleanBase64(input);
      const result = mode === 'encode' ? encodeBase64(cleanInput) : decodeBase64(cleanInput);
      
      if (result.success) {
        setOutput(result.output || '');
        setError('');
        
        const outputStr = result.output || '';
        setStats({
          chars: outputStr.length,
          bytes: new Blob([outputStr]).size
        });
        
        if (mode === 'encode' && isImageBase64(input)) {
          setViewMode('image');
        } else {
          setViewMode('text');
        }
      } else {
        setOutput('');
        setError(result.error || 'Processing failed');
        setStats({ chars: 0, bytes: 0 });
        setViewMode('text');
      }
    }, 200);

    debouncedProcess();
  }, [input, mode]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const base64Data = base64.split(',')[1] || base64;
      setInput(base64Data);
      setUploadedImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = (format?: 'text' | 'image') => {
    if (!output) return;
    
    setShowDownloadMenu(false);
    
    // Check if it's an image
    const isImage = isImageBase64(input);
    
    if (format === 'image' || (isImage && mode === 'decode' && !format)) {
      // Download as image
      const imageType = getImageType(input);
      const byteCharacters = atob(getCleanBase64(input));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: `image/${imageType}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image.${imageType}`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Download as text
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = mode === 'decode' ? 'decoded.txt' : 'encoded.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const isJSON = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const outputLanguage = mode === 'decode' && isJSON(output) ? 'json' : 'text';

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input</span>
              {input && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {input.length.toLocaleString()} chars
                </span>
              )}
            </div>
            <div className="flex gap-2 items-center">
              {mode === 'encode' && (
                <label className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer">
                  Upload File
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}
              <button
                onClick={() => setMode('encode')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  mode === 'encode'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  mode === 'decode'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                Decode
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="text"
              value={input}
              onChange={(val) => setInput(val || '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'off',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingStrategy: 'advanced',
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Output</span>
              {output && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {stats.chars.toLocaleString()} chars · {stats.bytes.toLocaleString()} bytes
                </span>
              )}
            </div>
            <div className="flex gap-2 items-center">
              {mode === 'encode' && output && isImageBase64(input) && (
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('text')}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      viewMode === 'text'
                        ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                    }`}
                  >
                    Text
                  </button>
                  <button
                    onClick={() => setViewMode('image')}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      viewMode === 'image'
                        ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                    }`}
                  >
                    Image
                  </button>
                </div>
              )}
              {output && !error && (
                <>
                  {isImageBase64(input) ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                        className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors flex items-center gap-1"
                      >
                        Download
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {showDownloadMenu && (
                        <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded shadow-lg z-10">
                          <button
                            onClick={() => handleDownload('image')}
                            className="w-full text-left px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                          >
                            As Image (.{getImageType(input)})
                          </button>
                          <button
                            onClick={() => handleDownload('text')}
                            className="w-full text-left px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                          >
                            As Text (.txt)
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDownload()}
                      className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                    >
                      Download
                    </button>
                  )}
                  <CopyButton text={output} />
                </>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-0">
            {error ? (
              <div className="p-4">
                <ErrorDisplay error={error} />
              </div>
            ) : uploadedImage ? (
              <div className="h-full overflow-auto p-4 flex items-center justify-center bg-stone-50 dark:bg-stone-950">
                <img 
                  src={uploadedImage} 
                  alt="Preview" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : viewMode === 'image' && mode === 'encode' && isImageBase64(input) ? (
              <div className="h-full overflow-auto p-4 flex items-center justify-center bg-stone-50 dark:bg-stone-950">
                <img 
                  src={`data:image/${getImageType(input)};base64,${getCleanBase64(input)}`} 
                  alt="Decoded Image" 
                  className="max-w-full max-h-full object-contain"
                  onError={() => setViewMode('text')}
                />
              </div>
            ) : (
              <Editor
                height="100%"
                defaultLanguage={outputLanguage}
                value={output}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'off',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'on',
                  wrappingStrategy: 'advanced',
                }}
              />
            )}
          </div>
        </>
      }
    />
  );
}
