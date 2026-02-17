'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { textToAscii } from '@/lib/utils/asciiArt';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_TEXT = 'TypeDock';

export default function AsciiArtPage() {
  const [input, setInput] = useState(DEFAULT_TEXT);
  const [output, setOutput] = useState('');
  const [style, setStyle] = useState<'standard' | 'banner' | 'block'>('banner');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedGenerate = debounce(() => {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const result = textToAscii(input, style);
      setOutput(result);
    }, 200);

    debouncedGenerate();
  }, [input, style]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input Text</span>
            <div className="flex gap-2">
              <button
                onClick={() => setStyle('standard')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  style === 'standard'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setStyle('banner')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  style === 'banner'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                Banner
              </button>
              <button
                onClick={() => setStyle('block')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  style === 'block'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                Block
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
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">ASCII Art</span>
            {output && <CopyButton text={output} />}
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {output ? (
              <pre className="text-xs font-mono text-stone-900 dark:text-stone-100 whitespace-pre">
                {output}
              </pre>
            ) : (
              <div className="text-sm text-stone-500 dark:text-stone-400">Enter text to generate ASCII art</div>
            )}
          </div>
        </>
      }
    />
  );
}
