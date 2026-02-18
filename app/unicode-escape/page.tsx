'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

function TextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="text"
      value={value}
      onChange={(val) => onChange(val || '')}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
}

const DEFAULT_TEXT = `Hello World! 👋
Welcome to TypeDock 🚀
Price: $100.50 💰
Temperature: 25°C 🌡️

Special chars: α β γ δ ε
Math: ∑ ∏ ∫ √ ∞ ≠ ≤ ≥
Arrows: ← ↑ → ↓ ↔ ⇐ ⇑ ⇒ ⇓ ⇔`;

type EscapeMode = 'escape' | 'unescape' | 'unicode' | 'hex';

function escapeUnicode(text: string): string {
  return text.replace(/[^\x00-\x7F]/g, (char) => {
    const code = char.charCodeAt(0);
    return code > 0xFFFF 
      ? `\\u{${code.toString(16).toUpperCase()}}`
      : `\\u${code.toString(16).toUpperCase().padStart(4, '0')}`;
  });
}

function unescapeUnicode(text: string): string {
  return text
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function escapeHex(text: string): string {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return code > 127 
      ? `\\x${code.toString(16).toUpperCase().padStart(2, '0')}`
      : char;
  }).join('');
}

function unescapeHex(text: string): string {
  return text.replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

export default function UnicodeEscapePage() {
  const [input, setInput] = useState(DEFAULT_TEXT);
  const [mode, setMode] = useState<EscapeMode>('escape');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    switch (mode) {
      case 'escape':
        setResult(escapeUnicode(input));
        break;
      case 'unescape':
        setResult(unescapeUnicode(input));
        break;
      case 'unicode':
        setResult(escapeUnicode(input));
        break;
      case 'hex':
        setResult(escapeHex(input));
        break;
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'escape': return 'Escape Unicode (\\uXXXX)';
      case 'unescape': return 'Unescape Unicode';
      case 'unicode': return 'Escape All Unicode';
      case 'hex': return 'Escape Non-ASCII (\\xXX)';
    }
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input</span>
          </div>
          <div className="flex-1 min-h-0">
            <TextEditor value={input} onChange={setInput} />
          </div>
          <div className="h-auto min-h-[100px] px-4 py-3 flex flex-col gap-2 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase">
              Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as EscapeMode)}
              className="px-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
            >
              <option value="escape">Escape Unicode (\\uXXXX)</option>
              <option value="unescape">Unescape Unicode</option>
              <option value="hex">Escape Non-ASCII (\\xXX)</option>
            </select>
            <button
              onClick={handleConvert}
              className="mt-1 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              {getModeLabel()}
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Result</span>
              {result && (
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {result.length} chars
                </span>
              )}
            </div>
            {result && <CopyButton text={result} />}
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {result ? (
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase mb-2">
                      Escaped Text
                    </h3>
                    <pre className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-mono text-stone-800 dark:text-stone-200 overflow-x-auto whitespace-pre-wrap break-all">
                      {result}
                    </pre>
                  </div>
                  
                  {mode === 'escape' && (
                    <div>
                      <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase mb-2">
                        JavaScript Code Example
                      </h3>
                      <pre className="p-3 bg-stone-900 dark:bg-stone-950 rounded-lg text-sm font-mono text-green-400 overflow-x-auto">
                        {`const text = "${result.replace(/"/g, '\\"')}";\nconsole.log(text);`}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Click &quot;{getModeLabel()}&quot; to see results
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
