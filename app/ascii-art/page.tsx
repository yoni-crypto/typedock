'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { textToAscii, getAvailableFonts, getAvailableFrames, FontStyle, FrameStyle, ColorStyle } from '@/lib/utils/asciiArt';
import { debounce } from '@/lib/utils/debounce';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

const DEFAULT_TEXT = 'TypeDock';

const FONTS = getAvailableFonts();
const FRAMES = getAvailableFrames();

const COLORS: { value: ColorStyle; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'rainbow', label: 'Rainbow' },
  { value: 'neon', label: 'Neon' },
  { value: 'gold', label: 'Gold' },
  { value: 'ice', label: 'Ice' },
  { value: 'fire', label: 'Fire' },
  { value: 'matrix', label: 'Matrix' },
  { value: 'ocean', label: 'Ocean' },
];

export default function AsciiArtPage() {
  const [input, setInput] = useState(DEFAULT_TEXT);
  const [output, setOutput] = useState('');
  const [font, setFont] = useState<FontStyle>('standard');
  const [frame, setFrame] = useState<FrameStyle>('none');
  const [color, setColor] = useState<ColorStyle>('none');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [letterSpacing, setLetterSpacing] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    const debouncedGenerate = debounce(() => {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const result = textToAscii(input, {
        font,
        frame,
        color,
        align,
        letterSpacing,
        width: 80,
      });
      setOutput(result);
    }, 200);

    debouncedGenerate();
  }, [input, font, frame, color, align, letterSpacing]);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input Text</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 dark:text-stone-400">{FONTS.length} fonts</span>
            </div>
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
              }}
            />
          </div>
        </>
      }
      right={
        <>
          <div className="h-auto min-h-[40px] px-4 py-2 flex flex-wrap items-center gap-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">ASCII Art</span>
            
            {/* Font Selector */}
            <select
              value={font}
              onChange={(e) => setFont(e.target.value as FontStyle)}
              className="text-xs px-2 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f.charAt(0).toUpperCase() + f.slice(1).replace(/-/g, ' ')}
                </option>
              ))}
            </select>

            {/* Frame Selector */}
            <select
              value={frame}
              onChange={(e) => setFrame(e.target.value as FrameStyle)}
              className="text-xs px-2 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option value="none">No Frame</option>
              {FRAMES.filter(f => f !== 'none').map((f) => (
                <option key={f} value={f}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </option>
              ))}
            </select>

            {/* Align Buttons */}
            <div className="flex items-center gap-1 border-l border-stone-300 dark:border-stone-700 pl-3">
              <button
                onClick={() => setAlign('left')}
                className={`p-1 rounded transition-colors ${
                  align === 'left'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                title="Align Left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setAlign('center')}
                className={`p-1 rounded transition-colors ${
                  align === 'center'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                title="Align Center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setAlign('right')}
                className={`p-1 rounded transition-colors ${
                  align === 'right'
                    ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
                title="Align Right"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Color Selector */}
            <select
              value={color}
              onChange={(e) => setColor(e.target.value as ColorStyle)}
              className="text-xs px-2 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              {COLORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* Spacing Control */}
            <div className="flex items-center gap-2 border-l border-stone-300 dark:border-stone-700 pl-3">
              <span className="text-xs text-stone-500 dark:text-stone-400">Space:</span>
              <input
                type="range"
                min="0"
                max="3"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-16 h-1 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-stone-600 dark:text-stone-400 w-4">{letterSpacing}</span>
            </div>

            {output && <CopyButton text={output} />}
          </div>
          
          <div className="flex-1 p-6 overflow-auto bg-white dark:bg-stone-950">
            {output ? (
              <pre 
                className="text-sm whitespace-pre leading-none text-stone-900 dark:text-stone-100"
                style={{
                  fontFamily: "'Courier New', Courier, 'Consolas', 'Monaco', 'Lucida Console', 'DejaVu Sans Mono', monospace",
                  letterSpacing: '0.05em',
                  fontVariantLigatures: 'none',
                  fontFeatureSettings: '"liga" 0',
                  textRendering: 'geometricPrecision',
                }}
              >
                {output}
              </pre>
            ) : (
              <div className="text-sm text-stone-500 dark:text-stone-400">Enter text to generate ASCII art</div>
            )}
          </div>
        </>
      }
    />
  );
}
