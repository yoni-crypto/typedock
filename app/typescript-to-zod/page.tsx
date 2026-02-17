'use client';

import { useState, useEffect } from 'react';
import { CodeOutput } from '@/components/editor/CodeOutput';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { InputSource } from '@/components/ui/InputSource';
import { parseTypescriptToAST } from '@/lib/parsers/parseTypescript';
import { generateZodSchema } from '@/lib/generators/generateZod';
import { generateMockData } from '@/lib/generators/generateMockData';
import { debounce } from '@/lib/utils/debounce';
import { trackConversion, trackFileLoad, trackClear, trackMockGeneration } from '@/lib/analytics/events';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';
import type { ASTType } from '@/lib/inference/astTypes';

const DEFAULT_TS = `interface User {
  id: number;
  name: string;
  email?: string;
  active: boolean;
}`;

export default function TypescriptToZodPage() {
  const [input, setInput] = useState(DEFAULT_TS);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [strict, setStrict] = useState(false);
  const [currentAST, setCurrentAST] = useState<ASTType | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const result = parseTypescriptToAST(input);
      
      if (!result.success) {
        setError(result.error);
        setOutput('');
        setCurrentAST(null);
        return;
      }

      setError('');
      setCurrentAST(result.ast);
      const code = generateZodSchema(result.ast, result.name, { strict });
      setOutput(code);
      trackConversion('typescript-to-zod', { strict });
    }, 200);

    debouncedConvert();
  }, [input, strict]);

  const handleGenerateMock = () => {
    if (!currentAST) return;
    const mockData = generateMockData(currentAST, 1);
    const jsonOutput = JSON.stringify(mockData, null, 2);
    navigator.clipboard.writeText(jsonOutput);
    trackMockGeneration('typescript-to-zod');
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">TypeScript</span>
            <div className="flex items-center gap-2">
              {currentAST && (
                <button
                  onClick={handleGenerateMock}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  title="Generate mock data and copy to clipboard"
                >
                  Generate Mock
                </button>
              )}
              <InputSource 
                onLoad={(code) => {
                  setInput(code);
                  trackFileLoad('file');
                }} 
                onClear={() => {
                  setInput('');
                  trackClear();
                }} 
              />
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              value={input}
              onChange={(val) => setInput(val || '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Zod Schema</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={strict}
                  onChange={(e) => setStrict(e.target.checked)}
                  className="rounded border-stone-300 dark:border-stone-600 dark:bg-stone-800"
                />
                Strict
              </label>
              {output && !error && <CopyButton text={output} />}
            </div>
          </div>
          <div className="flex-1 min-h-0">
            {error ? (
              <div className="p-4">
                <ErrorDisplay error={error} />
              </div>
            ) : (
              <CodeOutput value={output} language="typescript" />
            )}
          </div>
        </>
      }
    />
  );
}
