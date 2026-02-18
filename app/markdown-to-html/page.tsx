'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { debounce } from '@/lib/utils/debounce';
import { markdownToHtml, getHtmlStyles } from '@/lib/utils/markdownToHtml';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_MARKDOWN = `# Welcome to TypeDock Markdown Converter

Convert **Markdown** to **HTML** instantly with *live preview*.

## Features

- GitHub-Flavored Markdown (GFM)
- Syntax highlighting for code blocks
- Live preview mode
- Tables, task lists, and more!

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('TypeDock'));
\`\`\`

## Table Example

| Feature | Status |
|---------|--------|
| GFM | Enabled |
| Syntax Highlighting | Enabled |
| Live Preview | Enabled |

## Task List

- [x] Create markdown converter
- [x] Add syntax highlighting
- [ ] Add more features

> **Note:** All conversions happen client-side. Your data never leaves your browser!

---

*Converted with [TypeDock](https://typedock.vercel.app)*`;

type ViewMode = 'code' | 'preview';

export default function MarkdownToHtmlPage() {
  const [input, setInput] = useState(DEFAULT_MARKDOWN);
  const [output, setOutput] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('code');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const html = markdownToHtml(input);
      setOutput(html);
    }, 200);

    debouncedConvert();
  }, [input]);

  const isDark = theme === 'dark';
  
  const previewHtml = `
<!DOCTYPE html>
<html>
<head>${getHtmlStyles(isDark)}</head>
<body>
  <div class="markdown-preview">
    ${output}
  </div>
</body>
</html>`;

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Markdown</span>
            <button
              onClick={() => setInput('')}
              className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="markdown"
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('code')}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  viewMode === 'code'
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                HTML Code
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                Live Preview
              </button>
            </div>
            {viewMode === 'code' && output && <CopyButton text={output} />}
          </div>
          <div className="flex-1 min-h-0">
            {viewMode === 'code' ? (
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
            ) : (
              <iframe
                srcDoc={previewHtml}
                className="w-full h-full border-0"
                sandbox="allow-same-origin"
                title="Markdown Preview"
              />
            )}
          </div>
        </>
      }
    />
  );
}
