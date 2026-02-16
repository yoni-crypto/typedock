'use client';

import { useState, useEffect } from 'react';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { CodeOutput } from '@/components/editor/CodeOutput';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { TabGroup } from '@/components/ui/TabGroup';
import { InputSource } from '@/components/ui/InputSource';
import { parseJson, parseMultipleJson } from '@/lib/utils/parseJson';
import { inferType } from '@/lib/inference/inferTypes';
import { detectLiteralsAndEnums } from '@/lib/inference/mergeSamples';
import { generateZodSchema } from '@/lib/generators/generateZod';
import { generateInterface } from '@/lib/generators/generateTypescript';
import { debounce } from '@/lib/utils/debounce';
import { trackConversion, trackFileLoad, trackClear } from '@/lib/analytics/events';

const DEFAULT_JSON = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "active": true
}`;

const TABS = ['Schema', 'Interface', 'Both'];

export default function JsonToZodPage() {
  const [input, setInput] = useState(DEFAULT_JSON);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Schema');
  const [strict, setStrict] = useState(false);

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const multiResult = parseMultipleJson(input);
      
      if (multiResult.success) {
        setError('');
        const ast = detectLiteralsAndEnums(multiResult.data);
        
        let code = '';
        if (activeTab === 'Schema') {
          code = generateZodSchema(ast, 'Data', { strict });
        } else if (activeTab === 'Interface') {
          code = generateInterface(ast, 'Data');
        } else {
          code = generateZodSchema(ast, 'Data', { strict, includeInterface: true });
        }
        
        setOutput(code);
        trackConversion('zod', { multiSample: true, tab: activeTab, strict });
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
      
      let code = '';
      if (activeTab === 'Schema') {
        code = generateZodSchema(ast, 'Data', { strict });
      } else if (activeTab === 'Interface') {
        code = generateInterface(ast, 'Data');
      } else {
        code = generateZodSchema(ast, 'Data', { strict, includeInterface: true });
      }
      
      setOutput(code);
      trackConversion('zod', { multiSample: false, tab: activeTab, strict });
    }, 200);

    debouncedConvert();
  }, [input, activeTab, strict]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON</span>
            <InputSource 
              onLoad={(json) => {
                setInput(json);
                trackFileLoad('file');
              }} 
              onClear={() => {
                setInput('');
                trackClear();
              }} 
            />
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={input} onChange={setInput} />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Zod</span>
              <TabGroup tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
            </div>
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
