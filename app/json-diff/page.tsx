'use client';

import { useState } from 'react';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { DiffDisplay } from '@/components/ui/DiffDisplay';
import { diffJson } from '@/lib/utils/jsonDiff';
import type { DiffResult } from '@/lib/utils/jsonDiff';

const DEFAULT_OLD = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "active": true
}`;

const DEFAULT_NEW = `{
  "id": 1,
  "name": "John Smith",
  "email": "john.smith@example.com",
  "role": "admin"
}`;

export default function JsonDiffPage() {
  const [oldJson, setOldJson] = useState(DEFAULT_OLD);
  const [newJson, setNewJson] = useState(DEFAULT_NEW);
  const [result, setResult] = useState<DiffResult | null>(null);
  const [error, setError] = useState('');

  const handleCompare = () => {
    const diffResult = diffJson(oldJson, newJson);
    
    if ('error' in diffResult) {
      setError(diffResult.error);
      setResult(null);
    } else {
      setError('');
      setResult(diffResult);
    }
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Original JSON</span>
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={oldJson} onChange={setOldJson} />
          </div>
          <div className="h-10 px-4 flex items-center justify-between border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">New JSON</span>
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={newJson} onChange={setNewJson} />
          </div>
          <div className="h-12 px-4 flex items-center justify-center border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <button
              onClick={handleCompare}
              className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Compare
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Differences</span>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {error ? (
              <div className="p-6">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            ) : result ? (
              <DiffDisplay result={result} />
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Click "Compare" to see differences
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
