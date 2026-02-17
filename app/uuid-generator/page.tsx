'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState<'v4' | 'v1'>('v4');
  const { theme } = useTheme();

  const generateUUIDs = (num: number) => {
    const newUuids = Array.from({ length: num }, () => {
      if (version === 'v4') {
        return crypto.randomUUID();
      } else {
        // v1 UUID (timestamp-based)
        const timestamp = Date.now();
        const random = Math.random().toString(16).substring(2, 15);
        return `${timestamp.toString(16).padStart(12, '0').substring(0, 8)}-${random.substring(0, 4)}-1${random.substring(4, 7)}-${random.substring(7, 11)}-${random.substring(11, 23).padEnd(12, '0')}`;
      }
    });
    setUuids(newUuids);
  };

  const output = uuids.join('\n');

  return (
    <SplitLayout
      left={
        <div className="h-full flex flex-col items-center justify-center p-8">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                UUID Generator
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Generate v4 UUIDs instantly
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  UUID Version
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setVersion('v4')}
                    className={`flex-1 px-3 py-2 text-sm rounded border transition-colors ${
                      version === 'v4'
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600'
                    }`}
                  >
                    v4 (Random)
                  </button>
                  <button
                    onClick={() => setVersion('v1')}
                    className={`flex-1 px-3 py-2 text-sm rounded border transition-colors ${
                      version === 'v1'
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                        : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600'
                    }`}
                  >
                    v1 (Timestamp)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Number of UUIDs
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => generateUUIDs(count)}
                  className="flex-1 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Generated UUIDs</span>
              {uuids.length > 0 && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {uuids.length} UUID{uuids.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            {output && <CopyButton text={output} />}
          </div>
          <div className="flex-1 min-h-0">
            {!output ? (
              <div className="h-full flex items-center justify-center text-stone-500 dark:text-stone-400 text-sm">
                Click generate to create UUIDs
              </div>
            ) : (
              <Editor
                height="100%"
                defaultLanguage="text"
                value={output}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            )}
          </div>
        </>
      }
    />
  );
}
