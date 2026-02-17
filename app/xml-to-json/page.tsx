'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { xmlToJson, jsonToXml } from '@/lib/utils/xmlToJson';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_XML = `<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user id="1">
    <name>John Doe</name>
    <email>john@example.com</email>
  </user>
  <user id="2">
    <name>Jane Smith</name>
    <email>jane@example.com</email>
  </user>
</users>`;

export default function XmlToJsonPage() {
  const [input, setInput] = useState(DEFAULT_XML);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'toJson' | 'toXml'>('toJson');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const result = mode === 'toJson' ? xmlToJson(input) : jsonToXml(input);
      if (result.success) {
        setOutput(result.output || '');
        setError('');
      } else {
        setOutput('');
        setError(result.error || 'Conversion failed');
      }
    }, 200);

    debouncedConvert();
  }, [input, mode]);

  useEffect(() => {
    if (mode === 'toXml') {
      setInput('{"users":{"user":[{"@attributes":{"id":"1"},"name":"John Doe","email":"john@example.com"}]}}');
    } else {
      setInput(DEFAULT_XML);
    }
  }, [mode]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {mode === 'toJson' ? 'XML' : 'JSON'} Input
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('toJson')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  mode === 'toJson'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                XML → JSON
              </button>
              <button
                onClick={() => setMode('toXml')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  mode === 'toXml'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                JSON → XML
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage={mode === 'toJson' ? 'xml' : 'json'}
              value={input}
              onChange={(val) => setInput(val || '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {mode === 'toJson' ? 'JSON' : 'XML'} Output
            </span>
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
                defaultLanguage={mode === 'toJson' ? 'json' : 'xml'}
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
