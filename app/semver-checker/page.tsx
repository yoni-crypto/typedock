'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

function isValidSemver(version: string): boolean {
  return /^\d+\.\d+\.\d+/.test(version);
}

export default function SemverCheckerPage() {
  const [version1, setVersion1] = useState('1.2.3');
  const [version2, setVersion2] = useState('1.3.0');
  const [result, setResult] = useState<string>('');

  const handleCompare = () => {
    if (!isValidSemver(version1) || !isValidSemver(version2)) {
      setResult('Invalid semver format. Use format: x.y.z (e.g., 1.2.3)');
      return;
    }

    const comparison = compareVersions(version1, version2);
    let message = '';
    
    if (comparison > 0) {
      message = `${version1} is greater than ${version2}`;
    } else if (comparison < 0) {
      message = `${version1} is less than ${version2}`;
    } else {
      message = `${version1} equals ${version2}`;
    }

    setResult(message);
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Version Comparison</span>
          </div>
          <div className="flex-1 min-h-0 p-4 space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase block mb-2">
                Version 1
              </label>
              <input
                type="text"
                value={version1}
                onChange={(e) => setVersion1(e.target.value)}
                placeholder="1.2.3"
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase block mb-2">
                Version 2
              </label>
              <input
                type="text"
                value={version2}
                onChange={(e) => setVersion2(e.target.value)}
                placeholder="1.3.0"
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-sm"
              />
            </div>
          </div>
          <div className="h-12 px-4 flex items-center justify-center border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <button
              onClick={handleCompare}
              className="px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Compare Versions
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Result</span>
            {result && <CopyButton text={result} />}
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center p-4">
            {result ? (
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-4">
                  {result}
                </div>
                <div className="text-sm text-stone-500 dark:text-stone-400">
                  Semver format: MAJOR.MINOR.PATCH
                </div>
              </div>
            ) : (
              <div className="text-stone-500 dark:text-stone-400 text-sm">
                Enter versions and click Compare
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
