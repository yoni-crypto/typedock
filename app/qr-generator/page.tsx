'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { generateQRCode } from '@/lib/utils/qrcode';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_TEXT = 'https://typedock.dev';

export default function QRGeneratorPage() {
  const [input, setInput] = useState(DEFAULT_TEXT);
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedGenerate = debounce(async () => {
      if (!input.trim()) {
        setQrCode('');
        setError('');
        return;
      }

      try {
        const code = await generateQRCode(input);
        setQrCode(code);
        setError('');
      } catch (e) {
        setQrCode('');
        setError(e instanceof Error ? e.message : 'Failed to generate QR code');
      }
    }, 200);

    debouncedGenerate();
  }, [input]);

  const handleDownload = () => {
    if (!qrCode) return;
    
    const a = document.createElement('a');
    a.href = qrCode;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input Text</span>
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
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">QR Code</span>
            {qrCode && (
              <button
                onClick={handleDownload}
                className="px-2 py-0.5 text-xs rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                Download
              </button>
            )}
          </div>
          <div className="flex-1 p-6 flex items-center justify-center overflow-auto">
            {error ? (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            ) : qrCode ? (
              <div className="flex flex-col items-center gap-4">
                <img src={qrCode} alt="QR Code" className="border border-stone-300 dark:border-stone-700 rounded" />
                <div className="text-xs text-stone-500 dark:text-stone-400 text-center max-w-xs break-words">
                  {input}
                </div>
              </div>
            ) : (
              <div className="text-sm text-stone-500 dark:text-stone-400">Enter text to generate QR code</div>
            )}
          </div>
        </>
      }
    />
  );
}
