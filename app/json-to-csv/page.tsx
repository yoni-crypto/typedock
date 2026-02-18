'use client';

import { useState } from 'react';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

const DEFAULT_JSON = `[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "active": true,
    "balance": 1500.50
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "active": false,
    "balance": 2500.00
  },
  {
    "id": 3,
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "age": 35,
    "active": true,
    "balance": 800.25
  }
]`;

type Delimiter = ',' | '\t' | ';' | '|';

function flattenObject(obj: any, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      
      if (value === null || value === undefined) {
        result[newKey] = '';
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value, newKey));
      } else if (Array.isArray(value)) {
        result[newKey] = value.join(', ');
      } else {
        result[newKey] = value;
      }
    }
  }
  
  return result;
}

function jsonToCsv(jsonData: any[], delimiter: Delimiter = ',', flatten: boolean = true): { csv: string; headers: string[]; error: string | null } {
  try {
    if (!Array.isArray(jsonData)) {
      return { csv: '', headers: [], error: 'JSON must be an array of objects' };
    }
    
    if (jsonData.length === 0) {
      return { csv: '', headers: [], error: 'Array is empty' };
    }
    
    // Flatten all objects
    const flattenedData = flatten 
      ? jsonData.map(item => flattenObject(item))
      : jsonData;
    
    // Collect all unique headers
    const headersSet = new Set<string>();
    flattenedData.forEach(item => {
      Object.keys(item).forEach(key => headersSet.add(key));
    });
    const headers = Array.from(headersSet);
    
    // Escape special characters in CSV values
    const escapeValue = (value: any): string => {
      if (value === null || value === undefined) return '';
      let str = String(value);
      // Escape quotes by doubling them
      str = str.replace(/"/g, '""');
      // Wrap in quotes if contains delimiter, newline, or quote
      if (str.includes(delimiter) || str.includes('\n') || str.includes('\r') || str.includes('"')) {
        str = `"${str}"`;
      }
      return str;
    };
    
    // Build CSV
    const lines: string[] = [];
    
    // Header row
    lines.push(headers.map(h => escapeValue(h)).join(delimiter));
    
    // Data rows
    flattenedData.forEach(item => {
      const row = headers.map(header => escapeValue(item[header]));
      lines.push(row.join(delimiter));
    });
    
    return { csv: lines.join('\n'), headers, error: null };
  } catch (e) {
    return { csv: '', headers: [], error: e instanceof Error ? e.message : 'Conversion failed' };
  }
}

export default function JsonToCsvPage() {
  const [json, setJson] = useState(DEFAULT_JSON);
  const [delimiter, setDelimiter] = useState<Delimiter>(',');
  const [flatten, setFlatten] = useState(true);
  const [result, setResult] = useState('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      const data = JSON.parse(json);
      const { csv, headers: hdrs, error: err } = jsonToCsv(data, delimiter, flatten);
      
      if (err) {
        setError(err);
        setResult('');
        setHeaders([]);
      } else {
        setError('');
        setResult(csv);
        setHeaders(hdrs);
      }
    } catch (e) {
      setError('Invalid JSON');
      setResult('');
      setHeaders([]);
    }
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON Array Input</span>
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={json} onChange={setJson} />
          </div>
          <div className="h-auto min-h-[100px] px-4 py-3 flex flex-col gap-2 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase block mb-1">
                  Delimiter
                </label>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value as Delimiter)}
                  className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-sm"
                >
                  <option value=",">Comma (,)</option>
                  <option value="\t">Tab (\t)</option>
                  <option value=";">Semicolon (;)</option>
                  <option value="|">Pipe (|)</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase block mb-1">
                  Options
                </label>
                <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <input
                    type="checkbox"
                    checked={flatten}
                    onChange={(e) => setFlatten(e.target.checked)}
                    className="rounded"
                  />
                  Flatten nested objects
                </label>
              </div>
            </div>
            <button
              onClick={handleConvert}
              className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Convert to CSV
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">CSV Output</span>
              {headers.length > 0 && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {headers.length} columns
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
                {headers.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase mb-2">
                      Headers ({headers.length})
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {headers.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-1 text-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase mb-2">
                    CSV Data
                  </h3>
                  <pre className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-mono text-stone-800 dark:text-stone-200 overflow-x-auto">
                    {result}
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase mb-2">
                    Preview (Table View)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-stone-200 dark:border-stone-700">
                          {headers.slice(0, 6).map((h) => (
                            <th key={h} className="px-3 py-2 text-left font-medium text-stone-700 dark:text-stone-300">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.split('\n').slice(1, 4).map((row, idx) => (
                          <tr key={idx} className="border-b border-stone-100 dark:border-stone-800">
                            {row.split(delimiter).slice(0, 6).map((cell, cidx) => (
                              <td key={cidx} className="px-3 py-2 text-stone-600 dark:text-stone-400">
                                {cell.replace(/^"|"$/g, '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Click &quot;Convert to CSV&quot; to see results
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
