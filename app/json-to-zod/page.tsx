'use client';

import { useState, useEffect } from 'react';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { CodeOutput } from '@/components/editor/CodeOutput';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { TabGroup } from '@/components/ui/TabGroup';
import { InputSource } from '@/components/ui/InputSource';
import { JsonUtilities } from '@/components/ui/JsonUtilities';
import { parseJson, parseMultipleJson } from '@/lib/utils/parseJson';
import { inferType } from '@/lib/inference/inferTypes';
import { detectLiteralsAndEnums } from '@/lib/inference/mergeSamples';
import { generateZodSchema } from '@/lib/generators/generateZod';
import { generateInterface } from '@/lib/generators/generateTypescript';
import { generateMockData } from '@/lib/generators/generateMockData';
import { prettifyJson, minifyJson, sortJsonKeys, removeNullValues } from '@/lib/utils/jsonTransform';
import { debounce } from '@/lib/utils/debounce';
import { trackConversion, trackFileLoad, trackClear, trackMockGeneration } from '@/lib/analytics/events';
import type { ASTType } from '@/lib/inference/astTypes';

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
  const [currentAST, setCurrentAST] = useState<ASTType | null>(null);

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const multiResult = parseMultipleJson(input);
      
      if (multiResult.success) {
        setError('');
        const ast = detectLiteralsAndEnums(multiResult.data);
        setCurrentAST(ast);
        
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
        setCurrentAST(null);
        return;
      }

      setError('');
      const ast = inferType(singleResult.data);
      setCurrentAST(ast);
      
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

  const handleGenerateMock = () => {
    if (!currentAST) return;
    const mockData = generateMockData(currentAST, 1);
    setInput(JSON.stringify(mockData, null, 2));
    trackMockGeneration('json-to-zod');
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON</span>
              <JsonUtilities
                onPrettify={() => setInput(prettifyJson(input))}
                onMinify={() => setInput(minifyJson(input))}
                onSort={() => setInput(sortJsonKeys(input))}
                onRemoveNulls={() => setInput(removeNullValues(input))}
              />
            </div>
            <div className="flex items-center gap-2">
              {currentAST && (
                <button
                  onClick={handleGenerateMock}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                >
                  Generate Mock
                </button>
              )}
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
