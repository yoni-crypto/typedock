'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { JsonEditor } from '@/components/editor/JsonEditor';

const DEFAULT_JSON = `{
  "DATABASE_URL": "postgresql://localhost:5432/mydb",
  "API_KEY": "sk_test_123456789",
  "PORT": 3000,
  "DEBUG": true,
  "APP_NAME": "My Application"
}`;

function flattenObject(obj: any, prefix = '', uppercase = true): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}_${key}` : key;
    const finalKey = uppercase ? newKey.toUpperCase() : newKey;
    
    if (value === null || value === undefined) {
      result[finalKey] = '';
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey, uppercase));
    } else if (Array.isArray(value)) {
      result[finalKey] = value.join(',');
    } else {
      result[finalKey] = String(value);
    }
  }
  
  return result;
}

export default function JsonToEnvPage() {
  const [json, setJson] = useState(DEFAULT_JSON);
  const [prefix, setPrefix] = useState('');
  const [uppercase, setUppercase] = useState(true);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(json);
      const env = flattenObject(parsed, prefix, uppercase);
      const lines = Object.entries(env).map(([key, value]) => `${key}=${value}`);
      setResult(lines.join('\n'));
      setError('');
    } catch (e) {
      setError('Invalid JSON');
      setResult('');
    }
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON Input</span>
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={json} onChange={setJson} />
          </div>
          <div className="h-auto min-h-[100px] px-4 py-3 flex flex-col gap-2 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase block mb-1">
                  Prefix (optional)
                </label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="APP"
                  className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-sm"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="rounded"
                  />
                  Uppercase keys
                </label>
              </div>
            </div>
            <button
              onClick={handleConvert}
              className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Convert to ENV
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">.env Output</span>
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
                Click &quot;Convert to ENV&quot; to see results
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
