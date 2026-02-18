'use client';

import { useState, useMemo } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_LEFT = `Hello World
This is the original text.
It has multiple lines.
Some lines will be changed.
Goodbye!`;

const DEFAULT_RIGHT = `Hello World
This is the modified text.
It has multiple lines.
Some lines were updated.
Welcome!`;

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber: number;
}

function computeDiff(left: string, right: string): { left: DiffLine[]; right: DiffLine[] } {
  const leftLines = left.split('\n');
  const rightLines = right.split('\n');
  
  const result: { left: DiffLine[]; right: DiffLine[] } = { left: [], right: [] };
  
  let i = 0, j = 0;
  
  while (i < leftLines.length || j < rightLines.length) {
    if (i >= leftLines.length) {
      result.right.push({ type: 'added', content: rightLines[j], lineNumber: j + 1 });
      result.left.push({ type: 'unchanged', content: '', lineNumber: -1 });
      j++;
    } else if (j >= rightLines.length) {
      result.left.push({ type: 'removed', content: leftLines[i], lineNumber: i + 1 });
      result.right.push({ type: 'unchanged', content: '', lineNumber: -1 });
      i++;
    } else if (leftLines[i] === rightLines[j]) {
      result.left.push({ type: 'unchanged', content: leftLines[i], lineNumber: i + 1 });
      result.right.push({ type: 'unchanged', content: rightLines[j], lineNumber: j + 1 });
      i++;
      j++;
    } else {
      result.left.push({ type: 'removed', content: leftLines[i], lineNumber: i + 1 });
      result.right.push({ type: 'added', content: rightLines[j], lineNumber: j + 1 });
      i++;
      j++;
    }
  }
  
  return result;
}

export default function TextDiffPage() {
  const [left, setLeft] = useState(DEFAULT_LEFT);
  const [right, setRight] = useState(DEFAULT_RIGHT);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const { theme } = useTheme();

  const diff = useMemo(() => computeDiff(left, right), [left, right]);

  const stats = useMemo(() => {
    const added = diff.right.filter(l => l.type === 'added').length;
    const removed = diff.left.filter(l => l.type === 'removed').length;
    const unchanged = diff.left.filter(l => l.type === 'unchanged').length;
    return { added, removed, unchanged };
  }, [diff]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Original Text</span>
            <button
              onClick={() => setLeft('')}
              className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="plaintext"
              value={left}
              onChange={(val) => setLeft(val || '')}
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
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Modified Text</span>
              <div className="flex text-xs gap-2">
                <span className="text-green-600">+{stats.added}</span>
                <span className="text-red-600">-{stats.removed}</span>
              </div>
            </div>
            <button
              onClick={() => setRight('')}
              className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="plaintext"
              value={right}
              onChange={(val) => setRight(val || '')}
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
    />
  );
}
