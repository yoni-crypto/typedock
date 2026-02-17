'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { CopyButton } from '@/components/ui/CopyButton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { prettifyJson, minifyJson, sortJsonKeys, removeNullValues } from '@/lib/utils/jsonTransform';
import { parseJson } from '@/lib/utils/parseJson';
import { inferType } from '@/lib/inference/inferTypes';
import { generateMockData } from '@/lib/generators/generateMockData';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';
import type { ASTType } from '@/lib/inference/astTypes';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [currentAST, setCurrentAST] = useState<ASTType | null>(null);
  const [stats, setStats] = useState({ chars: 0, lines: 0, size: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedFormat = debounce(() => {
      if (!input) {
        setOutput('');
        setError('');
        setCurrentAST(null);
        return;
      }

      const result = parseJson(input);
      
      if (result.success) {
        setError('');
        const ast = inferType(result.data);
        setCurrentAST(ast);
        const formatted = prettifyJson(input);
        setOutput(formatted);
        
        const lines = formatted.split('\n').length;
        const size = new Blob([formatted]).size;
        setStats({
          chars: formatted.length,
          lines,
          size
        });
      } else {
        setError(result.error);
        setOutput('');
        setCurrentAST(null);
      }
    }, 200);

    debouncedFormat();
  }, [input]);

  const handleFormat = (action: 'prettify' | 'minify' | 'sort' | 'removeNulls') => {
    const result = parseJson(input);
    
    if (!result.success) {
      setError(result.error);
      setOutput('');
      setCurrentAST(null);
      return;
    }

    // Store AST for mock generation
    const ast = inferType(result.data);
    setCurrentAST(ast);

    let formatted = '';
    switch (action) {
      case 'prettify':
        formatted = prettifyJson(input);
        break;
      case 'minify':
        formatted = minifyJson(input);
        break;
      case 'sort':
        formatted = sortJsonKeys(input);
        break;
      case 'removeNulls':
        formatted = removeNullValues(input);
        break;
    }

    setOutput(formatted);
    setError('');
    
    // Calculate stats
    const lines = formatted.split('\n').length;
    const size = new Blob([formatted]).size;
    setStats({
      chars: formatted.length,
      lines,
      size
    });
  };

  const handleValidate = () => {
    const result = parseJson(input);
    
    if (result.success) {
      setError('');
      const ast = inferType(result.data);
      setCurrentAST(ast);
      setOutput(prettifyJson(input));
      const formatted = prettifyJson(input);
      const lines = formatted.split('\n').length;
      const size = new Blob([formatted]).size;
      setStats({
        chars: formatted.length,
        lines,
        size
      });
    } else {
      setError(result.error);
      setOutput('');
      setCurrentAST(null);
    }
  };

  const handleGenerateMock = () => {
    if (!currentAST) return;
    const mockData = generateMockData(currentAST, 1);
    setInput(JSON.stringify(mockData, null, 2));
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input JSON</span>
            <div className="flex items-center gap-2">
              {input && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {input.length.toLocaleString()} chars
                </span>
              )}
              {currentAST && (
                <button
                  onClick={handleGenerateMock}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                >
                  Generate Mock
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={input} onChange={setInput} />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Output</span>
              {output && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {stats.chars.toLocaleString()} chars · {stats.lines} lines · {stats.size} bytes
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleFormat('prettify')}
                className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                Prettify
              </button>
              <button
                onClick={() => handleFormat('minify')}
                className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                Minify
              </button>
              <button
                onClick={() => handleFormat('sort')}
                className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                Sort Keys
              </button>
              <button
                onClick={() => handleFormat('removeNulls')}
                className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                Remove Nulls
              </button>
              <button
                onClick={handleValidate}
                className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                Validate
              </button>
              {output && <CopyButton text={output} />}
            </div>
          </div>
          <div className="flex-1 min-h-0">
            {error ? (
              <div className="p-4">
                <ErrorDisplay error={error} />
              </div>
            ) : (
              <Editor
                height="100%"
                defaultLanguage="json"
                value={output}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            )}
          </div>
        </>
      }
    />
  );
}
