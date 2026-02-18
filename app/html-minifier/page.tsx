'use client';

import { useState, useMemo } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s*=\s*/g, '=')
    .replace(/>\s+/g, '>')
    .replace(/\s+</g, '<')
    .trim();
}

function beautifyHtml(html: string): string {
  let formatted = '';
  let indent = 0;
  const parts = html.replace(/></g, '>\n<').split('\n');
  
  for (const part of parts) {
    if (part.match(/^<\/\w/)) indent--;
    formatted += '  '.repeat(Math.max(0, indent)) + part + '\n';
    if (part.match(/^<[^\/][^>]*[^/]>$/) && !part.match(/<area|<base|<br|<col|<embed|<hr|<img|<input|<link|<meta|<param|<source|<track|<wbr/i)) {
      indent++;
    }
  }
  
  return formatted.trim();
}

export default function HtmlMinifierPage() {
  const [input, setInput] = useState('<!DOCTYPE html>\n<html>\n<head>\n    <title>Test</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n    <p>This is a test.</p>\n</body>\n</html>');
  const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
  const { theme } = useTheme();

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return mode === 'minify' ? minifyHtml(input) : beautifyHtml(input);
  }, [input, mode]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode('minify')}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  mode === 'minify'
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                Minify
              </button>
              <button
                onClick={() => setMode('beautify')}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  mode === 'beautify'
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                Beautify
              </button>
            </div>
            <button
              onClick={() => setInput('')}
              className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="html"
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
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {mode === 'minify' ? 'Minified' : 'Beautified'} HTML
            </span>
            {output && <CopyButton text={output} />}
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="html"
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
