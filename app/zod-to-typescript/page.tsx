'use client';

import { useState, useEffect } from 'react';
import { CodeOutput } from '@/components/editor/CodeOutput';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { generateTypeFromZod } from '@/lib/parsers/parseZod';
import { debounce } from '@/lib/utils/debounce';
import { trackConversion } from '@/lib/analytics/events';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_ZOD = `const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
  active: z.boolean(),
});`;

export default function ZodToTypescriptPage() {
  const [input, setInput] = useState(DEFAULT_ZOD);
  const [output, setOutput] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      try {
        const result = generateTypeFromZod(input, 'User');
        setOutput(result);
        trackConversion('zod-to-typescript', {});
      } catch (err) {
        setOutput('// Error: Could not parse Zod schema');
      }
    }, 200);

    debouncedConvert();
  }, [input]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Zod Schema</span>
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
              beforeMount={(monaco) => {
                monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                  noSemanticValidation: true,
                  noSyntaxValidation: false,
                });
                
                monaco.languages.typescript.typescriptDefaults.addExtraLib(
                  `declare const z: any;`,
                  'file:///node_modules/@types/zod/index.d.ts'
                );
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">TypeScript Type</span>
            {output && <CopyButton text={output} />}
          </div>
          <div className="flex-1 min-h-0">
            <CodeOutput value={output} language="typescript" />
          </div>
        </>
      }
    />
  );
}
