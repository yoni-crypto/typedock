'use client';

import type { DiffResult } from '@/lib/utils/jsonDiff';

interface DiffDisplayProps {
  result: DiffResult;
}

export function DiffDisplay({ result }: DiffDisplayProps) {
  const totalChanges = result.added.length + result.removed.length + result.changed.length;
  
  if (totalChanges === 0) {
    return (
      <div className="p-6">
        <div className="text-sm text-stone-600 dark:text-stone-400">
          No differences
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4 text-xs font-mono text-stone-600 dark:text-stone-400">
        <span>+{result.added.length}</span>
        <span>-{result.removed.length}</span>
        <span>~{result.changed.length}</span>
      </div>

      <div className="border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden">
        {result.added.map((item, index) => (
          <div key={`add-${index}`} className="border-b border-stone-200 dark:border-stone-800 last:border-b-0">
            <div className="px-3 py-2 bg-stone-50 dark:bg-stone-900 text-xs font-mono text-stone-600 dark:text-stone-400">
              {item.path}
            </div>
            <div className="bg-green-50 dark:bg-green-950/20">
              <div className="px-3 py-2 font-mono text-xs">
                <span className="text-green-700 dark:text-green-400">+ </span>
                <span className="text-green-900 dark:text-green-200">
                  {JSON.stringify(item.newValue)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {result.removed.map((item, index) => (
          <div key={`rem-${index}`} className="border-b border-stone-200 dark:border-stone-800 last:border-b-0">
            <div className="px-3 py-2 bg-stone-50 dark:bg-stone-900 text-xs font-mono text-stone-600 dark:text-stone-400">
              {item.path}
            </div>
            <div className="bg-red-50 dark:bg-red-950/20">
              <div className="px-3 py-2 font-mono text-xs">
                <span className="text-red-700 dark:text-red-400">- </span>
                <span className="text-red-900 dark:text-red-200">
                  {JSON.stringify(item.oldValue)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {result.changed.map((item, index) => (
          <div key={`chg-${index}`} className="border-b border-stone-200 dark:border-stone-800 last:border-b-0">
            <div className="px-3 py-2 bg-stone-50 dark:bg-stone-900 text-xs font-mono text-stone-600 dark:text-stone-400">
              {item.path}
            </div>
            <div>
              <div className="bg-red-50 dark:bg-red-950/20 px-3 py-2 font-mono text-xs">
                <span className="text-red-700 dark:text-red-400">- </span>
                <span className="text-red-900 dark:text-red-200">
                  {JSON.stringify(item.oldValue)}
                </span>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 px-3 py-2 font-mono text-xs">
                <span className="text-green-700 dark:text-green-400">+ </span>
                <span className="text-green-900 dark:text-green-200">
                  {JSON.stringify(item.newValue)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
