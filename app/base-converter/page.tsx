'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { convertToAllBases, validateInput, getBaseInfo } from '@/lib/utils/baseConverter';

const bases = [
  { value: 2, label: 'Binary (Base 2)' },
  { value: 8, label: 'Octal (Base 8)' },
  { value: 10, label: 'Decimal (Base 10)' },
  { value: 16, label: 'Hexadecimal (Base 16)' },
  { value: 32, label: 'Base32' },
  { value: 58, label: 'Base58' },
  { value: 64, label: 'Base64' },
];

interface ResultCardProps {
  label: string;
  value: string;
  copyText: string;
  dark?: boolean;
}

function ResultCard({ label, value, copyText, dark }: ResultCardProps) {
  return (
    <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-stone-700 dark:text-stone-300">{label}</span>
        <CopyButton text={copyText} />
      </div>
      <div className="text-lg font-mono text-stone-900 dark:text-stone-100 break-all">
        {value}
      </div>
    </div>
  );
}

export default function BaseConverterPage() {
  const [input, setInput] = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [results, setResults] = useState<ReturnType<typeof convertToAllBases>>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const validation = validateInput(input, fromBase);
    if (!validation.valid) {
      setError(validation.message);
      setResults(null);
      return;
    }
    setError('');
    const converted = convertToAllBases(input, fromBase);
    setResults(converted);
  }, [input, fromBase]);

  const baseInfo = getBaseInfo(fromBase);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input</span>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  From Base
                </label>
                <select
                  value={fromBase}
                  onChange={(e) => setFromBase(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
                >
                  {bases.map((base) => (
                    <option key={base.value} value={base.value}>
                      {base.label}
                    </option>
                  ))}
                </select>
                {baseInfo.example && (
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    Valid chars: {baseInfo.chars} (e.g., {baseInfo.example})
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Number
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter number..."
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
                />
                {error && (
                  <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setInput('')}
                  className="text-xs px-3 py-1.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <h3 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Quick Reference</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-400">
                  <div className="p-2 bg-stone-50 dark:bg-stone-900 rounded">
                    <span className="font-medium">Binary:</span> Base-2 (0,1)
                  </div>
                  <div className="p-2 bg-stone-50 dark:bg-stone-900 rounded">
                    <span className="font-medium">Octal:</span> Base-8 (0-7)
                  </div>
                  <div className="p-2 bg-stone-50 dark:bg-stone-900 rounded">
                    <span className="font-medium">Decimal:</span> Base-10 (0-9)
                  </div>
                  <div className="p-2 bg-stone-50 dark:bg-stone-900 rounded">
                    <span className="font-medium">Hex:</span> Base-16 (0-F)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Results</span>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {results ? (
              <div className="grid gap-3">
                <ResultCard label="Binary (Base 2)" value={results.binary} copyText={results.binary} />
                <ResultCard label="Octal (Base 8)" value={results.octal} copyText={results.octal} />
                <ResultCard label="Decimal (Base 10)" value={results.decimal} copyText={results.decimal} />
                <ResultCard label="Hexadecimal (Base 16)" value={results.hexadecimal} copyText={results.hexadecimal} />
                <ResultCard label="Base32" value={results.base32} copyText={results.base32} />
                <ResultCard label="Base58" value={results.base58} copyText={results.base58} />
                <ResultCard label="Base64" value={results.base64} copyText={results.base64} />
              </div>
            ) : (
              <div className="text-sm text-stone-500 dark:text-stone-400">
                {error || 'Enter a valid number to see conversions'}
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
