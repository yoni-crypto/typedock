'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { JsonEditor } from '@/components/editor/JsonEditor';
import * as TOML from '@iarna/toml';

const DEFAULT_JSON = `{
  "title": "JSON to TOML Example",
  "owner": {
    "name": "Tom Preston-Werner",
    "dob": "1979-05-27T07:32:00-08:00"
  },
  "database": {
    "enabled": true,
    "ports": [8000, 8001, 8002],
    "temp_targets": {
      "cpu": 79.5,
      "case": 72.0
    }
  }
}`;

function jsonToToml(obj: any, prefix = ''): string {
  const lines: string[] = [];
  
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      lines.push(`${key} = ""`);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Table
      const tableName = prefix ? `${prefix}.${key}` : key;
      lines.push(`\n[${tableName}]`);
      lines.push(jsonToToml(value, tableName));
    } else if (Array.isArray(value)) {
      // Array
      if (value.length === 0) {
        lines.push(`${key} = []`);
      } else if (typeof value[0] === 'object') {
        // Array of tables
        const tableName = prefix ? `${prefix}.${key}` : key;
        for (const item of value) {
          lines.push(`\n[[${tableName}]]`);
          lines.push(jsonToToml(item, tableName));
        }
      } else {
        lines.push(`${key} = [${value.map((v: any) => typeof v === 'string' ? `"${v}"` : v).join(', ')}]`);
      }
    } else if (typeof value === 'string') {
      lines.push(`${key} = "${value}"`);
    } else if (typeof value === 'boolean') {
      lines.push(`${key} = ${value}`);
    } else {
      lines.push(`${key} = ${value}`);
    }
  }
  
  return lines.join('\n');
}

export default function JsonToTomlPage() {
  const [json, setJson] = useState(DEFAULT_JSON);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(json);
      const toml = jsonToToml(parsed);
      setResult(toml.trim());
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
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
          <div className="h-12 px-4 flex items-center justify-center border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <button
              onClick={handleConvert}
              className="px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Convert to TOML
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">TOML Output</span>
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
                Click &quot;Convert to TOML&quot; to see results
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
