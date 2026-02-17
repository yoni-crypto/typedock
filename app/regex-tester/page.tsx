'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_PATTERN = '\\b[A-Z][a-z]+\\b';
const DEFAULT_TEXT = 'Hello World from TypeDock';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState(DEFAULT_PATTERN);
  const [testString, setTestString] = useState(DEFAULT_TEXT);
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedTest = debounce(() => {
      try {
        const flagStr = Object.entries(flags).filter(([_, v]) => v).map(([k]) => k).join('');
        const regex = new RegExp(pattern, flagStr);
        const results: any[] = [];
        
        if (flags.g) {
          let match;
          while ((match = regex.exec(testString)) !== null) {
            results.push({
              match: match[0],
              index: match.index,
              groups: match.slice(1),
            });
          }
        } else {
          const match = regex.exec(testString);
          if (match) {
            results.push({
              match: match[0],
              index: match.index,
              groups: match.slice(1),
            });
          }
        }
        
        setMatches(results);
        setError('');
      } catch (e) {
        setMatches([]);
        setError(e instanceof Error ? e.message : 'Invalid regex');
      }
    }, 200);

    debouncedTest();
  }, [pattern, testString, flags]);

  const highlightMatches = () => {
    if (matches.length === 0) return testString;
    
    let result = '';
    let lastIndex = 0;
    
    matches.forEach((m) => {
      result += testString.slice(lastIndex, m.index);
      result += `<mark class="bg-yellow-200 dark:bg-yellow-700">${m.match}</mark>`;
      lastIndex = m.index + m.match.length;
    });
    
    result += testString.slice(lastIndex);
    return result;
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Pattern & Test String</span>
          </div>
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-auto">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Regular Expression
              </label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
                placeholder="Enter regex pattern"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Flags
              </label>
              <div className="flex gap-3">
                {Object.entries({ g: 'Global', i: 'Case Insensitive', m: 'Multiline', s: 'Dotall' }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flags[key as keyof typeof flags]}
                      onChange={(e) => setFlags({ ...flags, [key]: e.target.checked })}
                      className="rounded border-stone-300 dark:border-stone-700"
                    />
                    <span className="text-xs text-stone-600 dark:text-stone-400">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Test String
              </label>
              <Editor
                height="200px"
                defaultLanguage="text"
                value={testString}
                onChange={(val) => setTestString(val || '')}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
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
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Matches ({matches.length})
            </span>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {error ? (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            ) : matches.length === 0 ? (
              <div className="text-sm text-stone-500 dark:text-stone-400">No matches found</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">Highlighted Text</div>
                  <div 
                    className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded text-sm font-mono whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                  />
                </div>

                <div>
                  <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">Match Details</div>
                  <div className="space-y-2">
                    {matches.map((m, i) => (
                      <div key={i} className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">Match {i + 1}</span>
                          <CopyButton text={m.match} />
                        </div>
                        <div className="text-sm font-mono text-stone-900 dark:text-stone-100 mb-1">{m.match}</div>
                        <div className="text-xs text-stone-500 dark:text-stone-400">
                          Index: {m.index} - {m.index + m.match.length}
                        </div>
                        {m.groups.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                            <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Groups</div>
                            {m.groups.map((g: string, gi: number) => (
                              <div key={gi} className="text-xs text-stone-600 dark:text-stone-400">
                                Group {gi + 1}: {g || '(empty)'}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
