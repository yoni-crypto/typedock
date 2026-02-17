'use client';

import { useState } from 'react';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { ValidationDisplay } from '@/components/ui/ValidationDisplay';
import { validateWithZod } from '@/lib/utils/zodValidator';
import type { ValidationResult } from '@/lib/utils/zodValidator';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_JSON = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "active": true
}`;

const DEFAULT_SCHEMA = `const DataSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  active: z.boolean(),
});`;

export default function ValidatorPage() {
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [schemaInput, setSchemaInput] = useState(DEFAULT_SCHEMA);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const { theme } = useTheme();

  const handleValidate = () => {
    const validationResult = validateWithZod(jsonInput, schemaInput);
    setResult(validationResult);
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JSON Data</span>
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={jsonInput} onChange={setJsonInput} />
          </div>
          <div className="h-10 px-4 flex items-center justify-between border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Zod Schema</span>
            <span className="text-xs text-stone-500 dark:text-stone-400">Use: const schema = z.object(...)</span>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              value={schemaInput}
              onChange={(val) => setSchemaInput(val || '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
              }}
              beforeMount={(monaco) => {
                // Add Zod type definitions to suppress TypeScript errors
                monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                  noSemanticValidation: false,
                  noSyntaxValidation: false,
                });
                
                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                  target: monaco.languages.typescript.ScriptTarget.Latest,
                  allowNonTsExtensions: true,
                  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                  module: monaco.languages.typescript.ModuleKind.CommonJS,
                  noEmit: true,
                  esModuleInterop: true,
                  jsx: monaco.languages.typescript.JsxEmit.React,
                  allowJs: true,
                  typeRoots: ['node_modules/@types'],
                });

                // Declare z as a global variable with Zod types
                monaco.languages.typescript.typescriptDefaults.addExtraLib(
                  `declare module 'zod' {
                    export const z: {
                      string: () => any;
                      number: () => any;
                      boolean: () => any;
                      null: () => any;
                      object: (shape: any) => any;
                      array: (type: any) => any;
                      union: (types: any[]) => any;
                      literal: (value: any) => any;
                      enum: (values: any[]) => any;
                      tuple: (types: any[]) => any;
                      record: (...args: any[]) => any;
                      intersection: (...args: any[]) => any;
                    };
                  }
                  declare const z: typeof import('zod').z;`,
                  'file:///node_modules/@types/zod/index.d.ts'
                );
              }}
            />
          </div>
          <div className="h-12 px-4 flex items-center justify-center border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <button
              onClick={handleValidate}
              className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Validate
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Validation Result</span>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {result ? (
              <ValidationDisplay result={result} />
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Click "Validate" to check your JSON against the schema
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
