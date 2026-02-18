'use client';

import { useState, useMemo } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_XML = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <user id="1">
    <name>John Doe</name>
    <email>john@example.com</email>
  </user>
  <user id="2">
    <name>Jane Smith</name>
    <email>jane@example.com</email>
  </user>
</root>`;

function formatXml(xml: string, indent: number = 2): string {
  let formatted = '';
  let currentIndent = 0;
  
  xml = xml.replace(/>\s+</g, '>\n<');
  const lines = xml.split('\n');
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    if (line.match(/^<\/\w/)) {
      currentIndent--;
    }
    
    formatted += ' '.repeat(currentIndent * indent) + line + '\n';
    
    if (line.match(/^<[^\/][^>]*[^/]>$/) && !line.match(/<area|<base|<br|<col|<embed|<hr|<img|<input|<link|<meta|<param|<source|<track|<wbr/i)) {
      currentIndent++;
    }
  }
  
  return formatted.trim();
}

function minifyXml(xml: string): string {
  return xml
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function XmlFormatterPage() {
  const [input, setInput] = useState(DEFAULT_XML);
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const { theme } = useTheme();

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return mode === 'format' ? formatXml(input) : minifyXml(input);
  }, [input, mode]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode('format')}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  mode === 'format'
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                Format
              </button>
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
              defaultLanguage="xml"
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
              {mode === 'format' ? 'Formatted' : 'Minified'} XML
            </span>
            {output && <CopyButton text={output} />}
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="xml"
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
