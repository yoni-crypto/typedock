'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { debounce } from '@/lib/utils/debounce';
import { htmlToMarkdown } from '@/lib/utils/htmlToMarkdown';
import { markdownToHtml, getHtmlStyles } from '@/lib/utils/markdownToHtml';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_HTML = `<h1>Hello World</h1>

<p>This is an <strong>HTML</strong> document with:</p>

<ul>
  <li>Bullet points</li>
  <li><em>Italic text</em></li>
  <li><a href="https://typedock.vercel.app">Links</a></li>
</ul>

<h2>Code Example</h2>

<pre><code class="language-javascript">const greeting = "Hello, TypeDock!";
console.log(greeting);
</code></pre>

<blockquote>
  <p>Blockquote example</p>
</blockquote>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tables</td>
      <td>Supported</td>
    </tr>
    <tr>
      <td>Code Blocks</td>
      <td>Supported</td>
    </tr>
  </tbody>
</table>`;

type ViewMode = 'code' | 'preview';

export default function HtmlToMarkdownPage() {
  const [input, setInput] = useState(DEFAULT_HTML);
  const [output, setOutput] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('code');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedConvert = debounce(() => {
      const markdown = htmlToMarkdown(input);
      setOutput(markdown);
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
    ${markdownToHtml(output)}
  </div>
</body>
</html>`;

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">HTML</span>
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('code')}
                className={`text-xs px-3 py-1 rounded transition-colors ${
                  viewMode === 'code'
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                Markdown Code
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
                defaultLanguage="markdown"
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
