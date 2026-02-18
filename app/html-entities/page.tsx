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
      defaultLanguage="html"
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

const DEFAULT_TEXT = `<h1>Hello World!</h1>
<p>This is a "test" with special chars: & < > " '</p>
<p>Copyright © 2024 • Euro € • Pound £</p>`;

// Common HTML entities mapping
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '€': '&euro;',
  '£': '&pound;',
  '¥': '&yen;',
  '¢': '&cent;',
  '§': '&sect;',
  '¶': '&para;',
  '•': '&bull;',
  '…': '&hellip;',
  '–': '&ndash;',
  '—': '&mdash;',
  ' ': '&nbsp;',
  '¡': '&iexcl;',
  '¿': '&iquest;',
  '°': '&deg;',
  '±': '&plusmn;',
  '×': '&times;',
  '÷': '&divide;',
  '¼': '&frac14;',
  '½': '&frac12;',
  '¾': '&frac34;',
  '∞': '&infin;',
  '≠': '&ne;',
  '≤': '&le;',
  '≥': '&ge;',
  '√': '&radic;',
  '∑': '&sum;',
  '∏': '&prod;',
  '∫': '&int;',
  '∂': '&part;',
  '∆': '&Delta;',
  '∇': '&nabla;',
  '∈': '&isin;',
  '∉': '&notin;',
  '∋': '&ni;',
  '∀': '&forall;',
  '∃': '&exist;',
  '∅': '&empty;',
  '∧': '&and;',
  '∨': '&or;',
  '∩': '&cap;',
  '∪': '&cup;',
  '⊂': '&sub;',
  '⊃': '&sup;',
  '⊆': '&sube;',
  '⊇': '&supe;',
  '∴': '&there4;',
  '∼': '&sim;',
  '≈': '&asymp;',
  '≡': '&equiv;',
  '≅': '&cong;',
  '←': '&larr;',
  '↑': '&uarr;',
  '→': '&rarr;',
  '↓': '&darr;',
  '↔': '&harr;',
  '↵': '&crarr;',
  '⇐': '&lArr;',
  '⇑': '&uArr;',
  '⇒': '&rArr;',
  '⇓': '&dArr;',
  '⇔': '&hArr;',
  '♠': '&spades;',
  '♣': '&clubs;',
  '♥': '&hearts;',
  '♦': '&diams;',
  '♪': '&sung;',
  '♫': '&flat;',
  'α': '&alpha;',
  'β': '&beta;',
  'γ': '&gamma;',
  'δ': '&delta;',
  'ε': '&epsilon;',
  'ζ': '&zeta;',
  'η': '&eta;',
  'θ': '&theta;',
  'ι': '&iota;',
  'κ': '&kappa;',
  'λ': '&lambda;',
  'μ': '&mu;',
  'ν': '&nu;',
  'ξ': '&xi;',
  'ο': '&omicron;',
  'π': '&pi;',
  'ρ': '&rho;',
  'σ': '&sigma;',
  'τ': '&tau;',
  'υ': '&upsilon;',
  'φ': '&phi;',
  'χ': '&chi;',
  'ψ': '&psi;',
  'ω': '&omega;',
};

function encodeHtmlEntities(text: string): string {
  let encoded = text;
  // First handle ampersand to avoid double encoding
  encoded = encoded.replace(/&/g, '&amp;');
  // Then handle other entities
  for (const [char, entity] of Object.entries(HTML_ENTITIES)) {
    if (char !== '&') {
      encoded = encoded.split(char).join(entity);
    }
  }
  return encoded;
}

function decodeHtmlEntities(text: string): string {
  let decoded = text;
  // Reverse mapping for named entities
  const reverseEntities: Record<string, string> = {};
  for (const [char, entity] of Object.entries(HTML_ENTITIES)) {
    reverseEntities[entity] = char;
  }
  
  // Decode named entities
  for (const [entity, char] of Object.entries(reverseEntities)) {
    decoded = decoded.split(entity).join(char);
  }
  
  // Decode numeric entities (decimal and hex)
  decoded = decoded.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
  
  return decoded;
}

export default function HtmlEntitiesPage() {
  const [input, setInput] = useState(DEFAULT_TEXT);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    if (mode === 'encode') {
      setResult(encodeHtmlEntities(input));
    } else {
      setResult(decodeHtmlEntities(input));
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
          <div className="h-auto min-h-[80px] px-4 py-3 flex flex-col gap-2 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase">
              Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('encode')}
                className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                  mode === 'encode'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                Encode → Entities
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                  mode === 'decode'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                Decode ← Entities
              </button>
            </div>
            <button
              onClick={handleConvert}
              className="mt-2 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              {mode === 'encode' ? 'Encode' : 'Decode'}
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
                  {result.length} characters
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
                      Code
                    </h3>
                    <pre className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm font-mono text-stone-800 dark:text-stone-200 overflow-x-auto">
                      {result}
                    </pre>
                  </div>
                  
                  {mode === 'decode' && (
                    <div>
                      <h3 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase mb-2">
                        Preview (Rendered HTML)
                      </h3>
                      <div 
                        className="p-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: result }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Click &quot;{mode === 'encode' ? 'Encode' : 'Decode'}&quot; to see results
              </div>
            )}
          </div>
          
          {/* Common Entities Reference */}
          <div className="border-t border-stone-200 dark:border-stone-800">
            <div className="px-4 py-2 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase">
                Common Entities
              </span>
            </div>
            <div className="p-2 grid grid-cols-4 gap-1 text-xs">
              {Object.entries(HTML_ENTITIES).slice(0, 20).map(([char, entity]) => (
                <div 
                  key={char}
                  className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <span className="font-mono">{char}</span>
                  <span className="text-stone-500">{entity}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      }
    />
  );
}
