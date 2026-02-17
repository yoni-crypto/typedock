'use client';

import { useState, useEffect } from 'react';
import { CodeOutput } from '@/components/editor/CodeOutput';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { jsonSchemaToTypescript } from '@/lib/parsers/parseJsonSchema';
import { debounce } from '@/lib/utils/debounce';
import { trackConversion } from '@/lib/analytics/events';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "active": { "type": "boolean" }
  },
  "required": ["id", "name", "email"]
}`;

export default function JsonSchemaToTypescriptPage() {
  const [input, setInput] = useState(DEFAULT_SCHEMA);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      try {
        const result = jsonSchemaToTypescript(input, 'Data');
        setOutput(result);
        setError('');
        trackConversion('json-schema-to-typescript', {});
      } catch (err) {
        setError('Invalid JSON Schema');
        setOutput('');
      }
    }, 200);

    debouncedConvert();
  }, [input]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON Schema</span>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="json"
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
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">TypeScript</span>
            {output && !error && <CopyButton text={output} />}
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
