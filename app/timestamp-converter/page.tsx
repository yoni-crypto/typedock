'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [humanReadable, setHumanReadable] = useState('');
  const [iso, setISO] = useState('');
  const [utc, setUTC] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        setHumanReadable('Invalid timestamp');
        setISO('');
        setUTC('');
        return;
      }

      const date = new Date(ts * 1000);
      setHumanReadable(date.toLocaleString());
      setISO(date.toISOString());
      setUTC(date.toUTCString());
    } catch {
      setHumanReadable('Invalid timestamp');
      setISO('');
      setUTC('');
    }
  }, [timestamp]);

  const setCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  };

  return (
    <SplitLayout
      left={
        <div className="h-full flex flex-col">
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Unix Timestamp</span>
            <button
              onClick={setCurrentTimestamp}
              className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              Current Time
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="text"
              value={timestamp}
              onChange={(val) => setTimestamp(val || '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'off',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      }
      right={
        <div className="h-full flex flex-col">
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Local Time</span>
            {humanReadable && <CopyButton text={humanReadable} />}
          </div>
          <div className="flex-1 min-h-0 border-b border-stone-200 dark:border-stone-800">
            <Editor
              height="100%"
              defaultLanguage="text"
              value={humanReadable}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'off',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">ISO 8601</span>
            {iso && <CopyButton text={iso} />}
          </div>
          <div className="flex-1 min-h-0 border-b border-stone-200 dark:border-stone-800">
            <Editor
              height="100%"
              defaultLanguage="text"
              value={iso}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'off',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">UTC</span>
            {utc && <CopyButton text={utc} />}
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="text"
              value={utc}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'off',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      }
    />
  );
}
