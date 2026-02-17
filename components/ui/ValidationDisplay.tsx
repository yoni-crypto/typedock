'use client';

import type { ValidationResult } from '@/lib/utils/zodValidator';
import { CopyButton } from './CopyButton';

interface ValidationDisplayProps {
  result: ValidationResult;
}

export function ValidationDisplay({ result }: ValidationDisplayProps) {
  if (result.success) {
    const dataString: string = result.data ? JSON.stringify(result.data, null, 2) : '';
    
    return (
      <div className="p-6">
        <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <h3 className="font-medium text-emerald-900 dark:text-emerald-100 mb-1">
              Validation Passed
            </h3>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              JSON data matches the Zod schema
            </p>
          </div>
        </div>
        
        {dataString && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-stone-700 dark:text-stone-300">Validated Data:</h4>
              <CopyButton text={dataString} />
            </div>
            <pre className="text-xs bg-stone-50 dark:bg-stone-900 p-3 rounded border border-stone-200 dark:border-stone-800 overflow-auto max-h-96">
              {dataString}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg mb-4">
        <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div>
          <h3 className="font-medium text-red-900 dark:text-red-100 mb-1">
            Validation Failed
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300">
            {result.errors?.length || 0} error{result.errors?.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-auto">
        {result.errors?.map((error, index) => (
          <div
            key={index}
            className="p-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
          >
            <div className="flex items-start gap-2">
              <code className="text-xs font-mono text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded">
                {error.path}
              </code>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {error.code}
              </span>
            </div>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-2">
              {error.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
