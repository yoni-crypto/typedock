'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { generateLorem } from '@/lib/utils/loremIpsum';

type Units = 'words' | 'sentences' | 'paragraphs' | 'bytes';

export default function LoremIpsumPage() {
  const [output, setOutput] = useState('');
  const [units, setUnits] = useState<Units>('paragraphs');
  const [count, setCount] = useState(4);
  const [startWithLorem, setStartWithLorem] = useState(true);

  useEffect(() => {
    let result = generateLorem({ units, [units]: count });
    
    if (!startWithLorem && units !== 'bytes') {
      const words = result.split(' ');
      if (words[0].toLowerCase() === 'lorem') {
        words.shift();
        if (words.length > 0) {
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
        result = words.join(' ');
      }
    }
    
    setOutput(result);
  }, [units, count, startWithLorem]);

  const regenerate = () => {
    let result = generateLorem({ units, [units]: count });
    
    if (!startWithLorem && units !== 'bytes') {
      const words = result.split(' ');
      if (words[0].toLowerCase() === 'lorem') {
        words.shift();
        if (words.length > 0) {
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
        result = words.join(' ');
      }
    }
    
    setOutput(result);
  };

  const presets = [
    { label: 'Words (10)', units: 'words' as Units, count: 10 },
    { label: 'Words (25)', units: 'words' as Units, count: 25 },
    { label: 'Words (50)', units: 'words' as Units, count: 50 },
    { label: 'Sentences (3)', units: 'sentences' as Units, count: 3 },
    { label: 'Sentences (5)', units: 'sentences' as Units, count: 5 },
    { label: 'Paragraphs (1)', units: 'paragraphs' as Units, count: 1 },
    { label: 'Paragraphs (3)', units: 'paragraphs' as Units, count: 3 },
    { label: 'Paragraphs (5)', units: 'paragraphs' as Units, count: 5 },
  ];

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Settings</span>
          </div>
          <div className="flex-1 p-4 overflow-auto space-y-6">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Type
              </label>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value as Units)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm text-stone-900 dark:text-stone-100"
              >
                <option value="words">Words</option>
                <option value="sentences">Sentences</option>
                <option value="paragraphs">Paragraphs</option>
                <option value="bytes">Bytes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Count
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm text-stone-900 dark:text-stone-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="startWithLorem"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded border-stone-300"
              />
              <label htmlFor="startWithLorem" className="text-sm text-stone-700 dark:text-stone-300">
                Start with "Lorem..."
              </label>
            </div>

            <button
              onClick={regenerate}
              className="w-full text-sm px-3 py-2 rounded-lg bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
            >
              Regenerate
            </button>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <h3 className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setUnits(preset.units);
                      setCount(preset.count);
                    }}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      units === preset.units && count === preset.count
                        ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Generated Text</span>
            {output && <CopyButton text={output} />}
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg min-h-full">
              <pre className="whitespace-pre-wrap text-sm text-stone-800 dark:text-stone-200 font-serif leading-relaxed">
                {output}
              </pre>
            </div>
          </div>
        </>
      }
    />
  );
}
