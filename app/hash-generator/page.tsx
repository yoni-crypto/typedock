'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { generateHashes, type HashResult } from '@/lib/utils/hashGenerator';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_TEXT = 'Hello, TypeDock!';

export default function HashGeneratorPage() {
  const [input, setInput] = useState(DEFAULT_TEXT);
  const [hashes, setHashes] = useState<HashResult | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedGenerate = debounce(async () => {
      if (!input) {
        setHashes(null);
        return;
      }
      
      const result = await generateHashes(input);
      setHashes(result);
    }, 200);

    debouncedGenerate();
  }, [input]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input</span>
            {input && (
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {input.length.toLocaleString()} chars
              </span>
            )}
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
          {!hashes ? (
            <div className="h-full flex items-center justify-center text-stone-500 dark:text-stone-400 text-sm">
              Enter text to generate hashes
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">MD5</span>
                <CopyButton text={hashes.md5} />
              </div>
              <div className="flex-1 min-h-0 border-b border-stone-200 dark:border-stone-800">
                <Editor
                  height="100%"
                  defaultLanguage="text"
                  value={hashes.md5}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                  }}
                />
              </div>

              <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">SHA-1</span>
                <CopyButton text={hashes.sha1} />
              </div>
              <div className="flex-1 min-h-0 border-b border-stone-200 dark:border-stone-800">
                <Editor
                  height="100%"
                  defaultLanguage="text"
                  value={hashes.sha1}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                  }}
                />
              </div>

              <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">SHA-256</span>
                <CopyButton text={hashes.sha256} />
              </div>
              <div className="flex-1 min-h-0 border-b border-stone-200 dark:border-stone-800">
                <Editor
                  height="100%"
                  defaultLanguage="text"
                  value={hashes.sha256}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                  }}
                />
              </div>

              <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">SHA-512</span>
                <CopyButton text={hashes.sha512} />
              </div>
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="text"
                  value={hashes.sha512}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </div>
          )}
        </>
      }
    />
  );
}
