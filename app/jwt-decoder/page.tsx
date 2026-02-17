'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { decodeJWT } from '@/lib/utils/jwtDecoder';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function JWTDecoderPage() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedDecode = debounce(() => {
      const result = decodeJWT(input);
      
      if (result.success) {
        setHeader(result.header ? JSON.stringify(result.header, null, 2) : '');
        setPayload(result.payload ? JSON.stringify(result.payload, null, 2) : '');
        setSignature(result.signature || '');
        setError('');
      } else {
        setHeader('');
        setPayload('');
        setSignature('');
        setError(result.error || 'Decoding failed');
      }
    }, 200);

    debouncedDecode();
  }, [input]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JWT Token</span>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="text"
              value={input}
              onChange={(val) => setInput(val || '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'off',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingStrategy: 'advanced',
              }}
            />
          </div>
        </>
      }
      right={
        <>
          {error ? (
            <div className="h-full flex flex-col">
              <div className="h-10 px-4 flex items-center border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Decoded</span>
              </div>
              <div className="flex-1 p-4">
                <ErrorDisplay error={error} />
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Header</span>
                {header && <CopyButton text={header} />}
              </div>
              <div className="flex-1 min-h-0 border-b border-stone-200 dark:border-stone-800">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  value={header}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Payload</span>
                {payload && <CopyButton text={payload} />}
              </div>
              <div className="flex-1 min-h-0 border-b border-stone-200 dark:border-stone-800">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  value={payload}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Signature</span>
                {signature && <CopyButton text={signature} />}
              </div>
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="text"
                  value={signature}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </div>
          )}
        </>
      }
    />
  );
}
