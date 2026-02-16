'use client';

import { useState, useEffect } from 'react';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { CodeOutput } from '@/components/editor/CodeOutput';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { InputSource } from '@/components/ui/InputSource';
import { parseJson, parseMultipleJson } from '@/lib/utils/parseJson';
import { inferType } from '@/lib/inference/inferTypes';
import { detectLiteralsAndEnums } from '@/lib/inference/mergeSamples';
import { generateInterface } from '@/lib/generators/generateTypescript';
import { debounce } from '@/lib/utils/debounce';

const DEFAULT_JSON = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "active": true
}`;

export default function JsonToTypescriptPage() {
  const [input, setInput] = useState(DEFAULT_JSON);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const multiResult = parseMultipleJson(input);
      
      if (multiResult.success) {
        setError('');
        const ast = detectLiteralsAndEnums(multiResult.data);
        const code = generateInterface(ast, 'Data');
        setOutput(code);
        return;
      }
      
      const singleResult = parseJson(input);
      
      if (!singleResult.success) {
        setError(singleResult.error);
        setOutput('');
        return;
      }

      setError('');
      const ast = inferType(singleResult.data);
      const code = generateInterface(ast, 'Data');
      setOutput(code);
    }, 200);

    debouncedConvert();
  }, [input]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON</span>
            <InputSource onLoad={setInput} onClear={() => setInput('')} />
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={input} onChange={setInput} />
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
