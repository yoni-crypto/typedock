'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { getAllCases } from '@/lib/utils/caseConverter';

const cases = [
  { key: 'camelCase', label: 'camelCase', example: 'helloWorldExample', category: 'Programming' },
  { key: 'pascalCase', label: 'PascalCase', example: 'HelloWorldExample', category: 'Programming' },
  { key: 'snakeCase', label: 'snake_case', example: 'hello_world_example', category: 'Programming' },
  { key: 'kebabCase', label: 'kebab-case', example: 'hello-world-example', category: 'Programming' },
  { key: 'constantCase', label: 'CONSTANT_CASE', example: 'HELLO_WORLD_EXAMPLE', category: 'Programming' },
  { key: 'dotCase', label: 'dot.case', example: 'hello.world.example', category: 'Programming' },
  { key: 'titleCase', label: 'Title Case', example: 'Hello World Example', category: 'Text' },
  { key: 'sentenceCase', label: 'Sentence case', example: 'Hello world example', category: 'Text' },
  { key: 'headerCase', label: 'Header-Case', example: 'Hello-World-Example', category: 'Text' },
  { key: 'pathCase', label: 'path/case', example: 'hello/world/example', category: 'Programming' },
  { key: 'upperCase', label: 'UPPERCASE', example: 'HELLO WORLD EXAMPLE', category: 'Text' },
  { key: 'lowerCase', label: 'lowercase', example: 'hello world example', category: 'Text' },
  { key: 'swapCase', label: 'sWAP cASE', example: 'HELLO WORLD EXAMPLE', category: 'Text' },
];

function ResultCard({ label, value, copyText }: { label: string; value: string; copyText: string }) {
  return (
    <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-stone-600 dark:text-stone-400">{label}</span>
        <CopyButton text={copyText} />
      </div>
      <div className="text-sm font-mono text-stone-900 dark:text-stone-100 break-all">
        {value}
      </div>
    </div>
  );
}

export default function CaseConverterPage() {
  const [input, setInput] = useState('hello world example text');
  const [results, setResults] = useState<ReturnType<typeof getAllCases> | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setResults(null);
      return;
    }
    setResults(getAllCases(input));
  }, [input]);

  const programmingCases = cases.filter(c => c.category === 'Programming');
  const textCases = cases.filter(c => c.category === 'Text');

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
                  Text to Convert
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text..."
                  rows={6}
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600 resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setInput(input.toUpperCase())}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                >
                  UPPER
                </button>
                <button
                  onClick={() => setInput(input.toLowerCase())}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                >
                  lower
                </button>
                <button
                  onClick={() => setInput(input.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '))}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                >
                  Title
                </button>
                <button
                  onClick={() => setInput('')}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                >
                  Clear
                </button>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <h3 className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">Quick Examples</h3>
                <div className="space-y-1 text-xs text-stone-500 dark:text-stone-400 font-mono">
                  <button onClick={() => setInput('hello world')} className="block hover:text-stone-700 dark:hover:text-stone-200">hello world</button>
                  <button onClick={() => setInput('user_name')} className="block hover:text-stone-700 dark:hover:text-stone-200">user_name</button>
                  <button onClick={() => setInput('api-key')} className="block hover:text-stone-700 dark:hover:text-stone-200">api-key</button>
                  <button onClick={() => setInput('MyVariableName')} className="block hover:text-stone-700 dark:hover:text-stone-200">MyVariableName</button>
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
            {results && (
              <button
                onClick={() => {
                  const allValues = Object.values(results).join('\n');
                  navigator.clipboard.writeText(allValues);
                }}
                className="text-xs px-2 py-1 rounded bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-300 dark:hover:bg-stone-700"
              >
                Copy All
              </button>
            )}
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {results ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Programming Cases</h3>
                  <div className="grid gap-2">
                    {programmingCases.map((caseType) => (
                      <ResultCard
                        key={caseType.key}
                        label={caseType.label}
                        value={results[caseType.key as keyof typeof results]}
                        copyText={results[caseType.key as keyof typeof results]}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Text Cases</h3>
                  <div className="grid gap-2">
                    {textCases.map((caseType) => (
                      <ResultCard
                        key={caseType.key}
                        label={caseType.label}
                        value={results[caseType.key as keyof typeof results]}
                        copyText={results[caseType.key as keyof typeof results]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-stone-500 dark:text-stone-400">
                Enter text to convert
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
