'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';
import * as TOML from '@iarna/toml';

function TextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="ini"
      value={value}
      onChange={(val) => onChange(val || '')}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}

const DEFAULT_TOML = `title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00

[database]
enabled = true
ports = [ 8000, 8001, 8002 ]
data = [ ["delta", "phi"], [3.14] ]
temp_targets = { cpu = 79.5, case = 72.0 }

[servers.alpha]
ip = "10.0.0.1"
role = "frontend"

[servers.beta]
ip = "10.0.0.2"
role = "backend"`;

export default function TomlToJsonPage() {
  const [toml, setToml] = useState(DEFAULT_TOML);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      const parsed = TOML.parse(toml);
      setResult(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid TOML');
      setResult('');
    }
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">TOML Input</span>
          </div>
          <div className="flex-1 min-h-0">
            <TextEditor value={toml} onChange={setToml} />
          </div>
          <div className="h-12 px-4 flex items-center justify-center border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <button
              onClick={handleConvert}
              className="px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Parse to JSON
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON Output</span>
            {result && <CopyButton text={result} />}
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {error ? (
              <div className="p-6">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            ) : result ? (
              <div className="p-4">
                <pre className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-mono text-stone-800 dark:text-stone-200">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Click &quot;Parse to JSON&quot; to convert
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
