'use client';

import { useState, useEffect, useCallback } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { formatSql, minifySql, validateSql, supportedDialects, FormatOptions } from '@/lib/utils/sqlFormatter';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_SQL = `SELECT 
    u.id, 
    u.username, 
    u.email, 
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
    AND u.status = 'active'
GROUP BY u.id, u.username, u.email
HAVING COUNT(o.id) > 5
ORDER BY total_spent DESC
LIMIT 10;`;

type ViewMode = 'formatted' | 'minified';

export default function SqlFormatterPage() {
  const [input, setInput] = useState(DEFAULT_SQL);
  const [output, setOutput] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('formatted');
  const [language, setLanguage] = useState<FormatOptions['language']>('sql');
  const [tabWidth, setTabWidth] = useState(2);
  const [keywordCase, setKeywordCase] = useState<FormatOptions['keywordCase']>('upper');
  const [validation, setValidation] = useState<{ valid: boolean; error?: string }>({ valid: true });
  const { theme } = useTheme();

  const formatSqlWithOptions = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setValidation({ valid: true });
      return;
    }

    const validationResult = validateSql(input);
    setValidation(validationResult);

    if (viewMode === 'minified') {
      setOutput(minifySql(input));
    } else {
      const formatted = formatSql(input, {
        language,
        tabWidth,
        keywordCase,
      });
      setOutput(formatted);
    }
  }, [input, viewMode, language, tabWidth, keywordCase]);

  useEffect(() => {
    const debouncedFormat = debounce(() => {
      formatSqlWithOptions();
    }, 300);
    debouncedFormat();
  }, [formatSqlWithOptions]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">SQL Input</span>
            <button
              onClick={() => setInput('')}
              className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="sql"
              value={input}
              onChange={(val) => setInput(val || '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                padding: { top: 16 },
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as FormatOptions['language'])}
                className="text-xs px-2 py-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-stone-700 dark:text-stone-300"
              >
                {supportedDialects.map((dialect) => (
                  <option key={dialect.value} value={dialect.value}>
                    {dialect.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setViewMode('formatted')}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  viewMode === 'formatted'
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                Formatted
              </button>
              <button
                onClick={() => setViewMode('minified')}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  viewMode === 'minified'
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                Minified
              </button>
            </div>
            {output && <CopyButton text={output} />}
          </div>

          {viewMode === 'formatted' && (
            <div className="px-4 py-2 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex flex-wrap gap-3">
              <div className="flex items-center gap-1">
                <label className="text-xs text-stone-600 dark:text-stone-400">Indent:</label>
                <select
                  value={tabWidth}
                  onChange={(e) => setTabWidth(Number(e.target.value))}
                  className="text-xs px-1 py-0.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-stone-700 dark:text-stone-300"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <label className="text-xs text-stone-600 dark:text-stone-400">Keywords:</label>
                <select
                  value={keywordCase}
                  onChange={(e) => setKeywordCase(e.target.value as FormatOptions['keywordCase'])}
                  className="text-xs px-1 py-0.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-stone-700 dark:text-stone-300"
                >
                  <option value="upper">UPPER</option>
                  <option value="lower">lower</option>
                  <option value="preserve">Preserve</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex-1 min-h-0">
            {!validation.valid && (
              <div className="mx-4 mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-600 dark:text-red-400">
                {validation.error}
              </div>
            )}
            <Editor
              height="100%"
              defaultLanguage="sql"
              value={output}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                padding: { top: 16 },
              }}
            />
          </div>
        </>
      }
    />
  );
}
