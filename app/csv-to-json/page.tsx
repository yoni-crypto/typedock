'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { csvToJson } from '@/lib/utils/csvToJson';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_CSV = `name,age,city
John,30,New York
Jane,25,Los Angeles
Bob,35,Chicago`;

export default function CsvToJsonPage() {
  const [input, setInput] = useState(DEFAULT_CSV);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const result = csvToJson(input);
      if (result.success) {
        setOutput(result.output || '');
        setError('');
      } else {
        setOutput('');
        setError(result.error || 'Conversion failed');
      }
    }, 200);

    debouncedConvert();
  }, [input]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">CSV Input</span>
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
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON Output</span>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="flex-1 p-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                defaultLanguage="json"
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
            </div>
          )}
        </>
      }
    />
  );
}
