'use client';

import { useState } from 'react';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

const DEFAULT_JSON = `{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  },
  "expensive": 10
}`;

function minifyJson(json: string): { result: string; originalSize: number; minifiedSize: number; error: string | null } {
  try {
    const parsed = JSON.parse(json);
    const minified = JSON.stringify(parsed);
    return {
      result: minified,
      originalSize: new Blob([json]).size,
      minifiedSize: new Blob([minified]).size,
      error: null
    };
  } catch (e) {
    return {
      result: '',
      originalSize: 0,
      minifiedSize: 0,
      error: e instanceof Error ? e.message : 'Invalid JSON'
    };
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function JsonMinifyPage() {
  const [json, setJson] = useState(DEFAULT_JSON);
  const [result, setResult] = useState('');
  const [stats, setStats] = useState({ originalSize: 0, minifiedSize: 0 });
  const [error, setError] = useState('');

  const handleMinify = () => {
    const { result: minified, originalSize, minifiedSize, error: err } = minifyJson(json);
    
    if (err) {
      setError(err);
      setResult('');
      setStats({ originalSize: 0, minifiedSize: 0 });
    } else {
      setError('');
      setResult(minified);
      setStats({ originalSize, minifiedSize });
    }
  };

  const savings = stats.originalSize > 0 
    ? ((stats.originalSize - stats.minifiedSize) / stats.originalSize * 100).toFixed(1)
    : '0';

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
          <div className="h-12 px-4 flex items-center justify-center border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <button
              onClick={handleMinify}
              className="px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Minify JSON
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Minified Output</span>
              {result && (
                <span className="text-xs text-green-600 dark:text-green-400">
                  -{savings}%
                </span>
              )}
            </div>
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
              <div className="p-4 space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-center">
                    <div className="text-xs text-stone-500 dark:text-stone-400 uppercase">Original</div>
                    <div className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                      {formatSize(stats.originalSize)}
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
                    <div className="text-xs text-green-600 dark:text-green-400 uppercase">Minified</div>
                    <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                      {formatSize(stats.minifiedSize)}
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                    <div className="text-xs text-blue-600 dark:text-blue-400 uppercase">Saved</div>
                    <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {savings}%
                    </div>
                  </div>
                </div>
                
                {/* Output */}
                <div>
                  <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase mb-2">
                    Minified JSON
                  </h3>
                  <pre className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-mono text-stone-800 dark:text-stone-200 overflow-x-auto whitespace-pre-wrap break-all">
                    {result}
                  </pre>
                </div>
                
                {/* One-liner */}
                <div>
                  <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase mb-2">
                    JavaScript Assignment
                  </h3>
                  <pre className="p-3 bg-stone-900 dark:bg-stone-950 rounded-lg text-sm font-mono text-green-400 overflow-x-auto">
                    {`const data = ${result};`}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Click &quot;Minify JSON&quot; to compress
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
