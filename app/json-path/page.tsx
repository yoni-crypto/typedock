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
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  },
  "expensive": 10
}`;

const EXAMPLES = [
  { query: '$.store.book[*].author', desc: 'Authors of all books' },
  { query: '$..author', desc: 'All authors' },
  { query: '$.store.*', desc: 'All items in store' },
  { query: '$.store.book[*]', desc: 'All books' },
  { query: '$..book[0,1]', desc: 'First two books' },
  { query: '$..book[-1:]', desc: 'Last book' },
  { query: '$..book[?(@.isbn)]', desc: 'Books with ISBN' },
  { query: '$..book[?(@.price<10)]', desc: 'Books under $10' },
];

// Simple JSONPath implementation
function jsonPath(json: any, path: string): { results: any[]; error: string | null } {
  try {
    // Parse the path
    const pathParts = path.split('.').filter(p => p);
    
    let results: any[] = [json];
    
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const newResults: any[] = [];
      let singleValues: any[] = [];
      
      if (part === '$') continue;
      
      if (part.includes('[') && part.includes(']')) {
        // Handle array notation
        const key = part.substring(0, part.indexOf('['));
        const indexMatch = part.match(/\[(.*?)\]/g);
        
        for (const current of results) {
          let value = key ? current?.[key] : current;
          
          if (indexMatch) {
            let shouldBreak = false;
            for (const idx of indexMatch) {
              if (shouldBreak) break;
              const inner = idx.slice(1, -1);
              
              if (inner === '*') {
                // Wildcard
                if (Array.isArray(value)) {
                  value.forEach((v: any) => newResults.push(v));
                } else if (value && typeof value === 'object') {
                  Object.values(value).forEach((v: any) => newResults.push(v));
                }
                shouldBreak = true;
              } else if (inner.startsWith('?(')) {
                // Filter expression
                const condition = inner.slice(2, -1);
                if (Array.isArray(value)) {
                  value.forEach((v: any) => {
                    try {
                      const conditionFunc = new Function('@', 'return ' + condition);
                      if (conditionFunc(v)) {
                        newResults.push(v);
                      }
                    } catch (e) {
                      // Silent fail
                    }
                  });
                }
                shouldBreak = true;
              } else if (inner.includes(':')) {
                // Slice notation
                const indices = inner.split(':').map(n => n === '' ? undefined : parseInt(n));
                if (Array.isArray(value)) {
                  const sliced = value.slice(indices[0], indices[1]);
                  sliced.forEach((v: any) => newResults.push(v));
                }
                shouldBreak = true;
              } else {
                // Single index
                const index = parseInt(inner);
                if (Array.isArray(value)) {
                  value = value[index];
                }
              }
            }
            if (!shouldBreak) {
              singleValues.push(value);
            }
          }
        }
        
        results = newResults.length > 0 ? newResults : singleValues;
      } else if (part === '*') {
        // Wildcard
        for (const current of results) {
          if (Array.isArray(current)) {
            current.forEach((v: any) => newResults.push(v));
          } else if (current && typeof current === 'object') {
            Object.values(current).forEach((v: any) => newResults.push(v));
          }
        }
        results = newResults;
      } else if (part.startsWith('?(')) {
        // Filter at root level (uncommon)
        const condition = part.slice(2, -1);
        for (const current of results) {
          if (Array.isArray(current)) {
            current.forEach((v: any) => {
              try {
                const conditionFunc = new Function('@', 'return ' + condition);
                if (conditionFunc(v)) {
                  newResults.push(v);
                }
              } catch (e) {
                // Silent fail
              }
            });
          }
        }
        results = newResults;
      } else {
        // Simple key access
        for (const current of results) {
          if (current && typeof current === 'object' && part in current) {
            newResults.push(current[part]);
          }
        }
        results = newResults.length > 0 ? newResults : [undefined];
      }
    }
    
    return { results, error: null };
  } catch (e) {
    return { results: [], error: e instanceof Error ? e.message : 'Invalid JSONPath' };
  }
}

export default function JsonPathPage() {
  const [json, setJson] = useState(DEFAULT_JSON);
  const [query, setQuery] = useState('$.store.book[*].author');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleQuery = () => {
    try {
      const data = JSON.parse(json);
      const { results: res, error: err } = jsonPath(data, query);
      
      if (err) {
        setError(err);
        setResults([]);
      } else {
        setError('');
        setResults(res);
      }
    } catch (e) {
      setError('Invalid JSON');
      setResults([]);
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
          <div className="h-auto min-h-[80px] px-4 py-3 flex flex-col gap-2 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase">
              JSONPath Query
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="$.store.book[*].author"
                className="flex-1 px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600"
              />
              <button
                onClick={handleQuery}
                className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
              >
                Query
              </button>
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Results</span>
              {results.length > 0 && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {results.length} match{results.length !== 1 ? 'es' : ''}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <CopyButton text={JSON.stringify(results, null, 2)} />
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {error ? (
              <div className="p-6">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="p-4 space-y-2">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                        [{idx}]
                      </span>
                      <span className="text-xs text-stone-400 dark:text-stone-500">
                        {typeof result}
                      </span>
                    </div>
                    <pre className="text-sm font-mono text-stone-800 dark:text-stone-200 overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Enter a query and click &quot;Query&quot; to get results
              </div>
            )}
          </div>
          
          {/* Examples Panel */}
          <div className="border-t border-stone-200 dark:border-stone-800">
            <div className="px-4 py-2 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase">
                Examples
              </span>
            </div>
            <div className="p-2 space-y-1">
              {EXAMPLES.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(ex.query);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors group"
                >
                  <code className="text-stone-700 dark:text-stone-300 font-mono">{ex.query}</code>
                  <span className="text-stone-400 dark:text-stone-500 ml-2">— {ex.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      }
    />
  );
}
