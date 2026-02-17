'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { yamlToJson, jsonToYaml } from '@/lib/utils/yamlToJson';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_YAML = `name: TypeDock
version: 1.0.0
features:
  - JSON Tools
  - Base64 Encoder
  - Hash Generator
config:
  theme: dark
  autoSave: true`;

export default function YamlToJsonPage() {
  const [input, setInput] = useState(DEFAULT_YAML);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'toJson' | 'toYaml'>('toJson');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const result = mode === 'toJson' ? yamlToJson(input) : jsonToYaml(input);
      if (result.success) {
        setOutput(result.output || '');
        setError('');
      } else {
        setOutput('');
        setError(result.error || 'Conversion failed');
      }
    }, 200);

    debouncedConvert();
  }, [input, mode]);

  useEffect(() => {
    if (mode === 'toYaml') {
      setInput('{"name":"TypeDock","version":"1.0.0"}');
    } else {
      setInput(DEFAULT_YAML);
    }
  }, [mode]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {mode === 'toJson' ? 'YAML' : 'JSON'} Input
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('toJson')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  mode === 'toJson'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                YAML → JSON
              </button>
              <button
                onClick={() => setMode('toYaml')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  mode === 'toYaml'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                JSON → YAML
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage={mode === 'toJson' ? 'yaml' : 'json'}
              value={input}
              onChange={(val) => setInput(val || '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {mode === 'toJson' ? 'JSON' : 'YAML'} Output
            </span>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="flex-1 p-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                defaultLanguage={mode === 'toJson' ? 'json' : 'yaml'}
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
            </div>
          )}
        </>
      }
    />
  );
}
