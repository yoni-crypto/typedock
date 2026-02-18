'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

interface Tool {
  href: string;
  label: string;
}

interface ToolGroup {
  name: string;
  tools: Tool[];
}

const toolGroups: ToolGroup[] = [
  {
    name: 'JSON',
    tools: [
      { href: '/json-to-typescript', label: 'JSON → TypeScript' },
      { href: '/json-to-zod', label: 'JSON → Zod' },
      { href: '/json-to-json-schema', label: 'JSON → JSON Schema' },
      { href: '/json-schema-to-typescript', label: 'JSON Schema → TS' },
      { href: '/typescript-to-zod', label: 'TypeScript → Zod' },
      { href: '/zod-to-typescript', label: 'Zod → TypeScript' },
      { href: '/json-diff', label: 'JSON Diff' },
      { href: '/json-formatter', label: 'JSON Formatter' },
      { href: '/json-minify', label: 'JSON Minify' },
      { href: '/json-path', label: 'JSON Path' },
      { href: '/csv-to-json', label: 'CSV → JSON' },
      { href: '/xml-to-json', label: 'XML ⇄ JSON' },
      { href: '/yaml-to-json', label: 'YAML ⇄ JSON' },
      { href: '/json-to-yaml', label: 'JSON → YAML' },
      { href: '/json-to-csv', label: 'JSON → CSV' },
      { href: '/json-to-toml', label: 'JSON → TOML' },
      { href: '/json-to-env', label: 'JSON → ENV' },
      { href: '/validator', label: 'Validator' },
    ],
  },
  {
    name: 'Encoding',
    tools: [
      { href: '/base64', label: 'Base64' },
      { href: '/url-encoder', label: 'URL Encoder' },
      { href: '/html-entities', label: 'HTML Entities' },
      { href: '/unicode-escape', label: 'Unicode Escape' },
      { href: '/html-minifier', label: 'HTML Minifier' },
      { href: '/xml-formatter', label: 'XML Formatter' },
      { href: '/sql-formatter', label: 'SQL Formatter' },
    ],
  },
  {
    name: 'Converters',
    tools: [
      { href: '/base-converter', label: 'Base Converter' },
      { href: '/markdown-to-html', label: 'Markdown → HTML' },
      { href: '/html-to-markdown', label: 'HTML → Markdown' },
      { href: '/toml-to-json', label: 'TOML → JSON' },
      { href: '/case-converter', label: 'Case Converter' },
    ],
  },
  {
    name: 'Security',
    tools: [
      { href: '/password-generator', label: 'Password Generator' },
      { href: '/hash-generator', label: 'Hash Generator' },
      { href: '/bcrypt', label: 'Bcrypt' },
      { href: '/jwt-decoder', label: 'JWT Decoder' },
      { href: '/jwt-generator', label: 'JWT Generator' },
    ],
  },
  {
    name: 'Design',
    tools: [
      { href: '/css-box-shadow', label: 'CSS Box Shadow' },
      { href: '/css-gradient', label: 'CSS Gradient' },
      { href: '/color-converter', label: 'Color Converter' },
      { href: '/qr-generator', label: 'QR Generator' },
      { href: '/ascii-art', label: 'ASCII Art' },
    ],
  },
  {
    name: 'Developer',
    tools: [
      { href: '/curl-to-fetch', label: 'cURL → Fetch' },
      { href: '/user-agent-parser', label: 'User Agent' },
      { href: '/semver-checker', label: 'Semver' },
      { href: '/text-diff', label: 'Text Diff' },
      { href: '/lorem-ipsum', label: 'Lorem Ipsum' },
      { href: '/regex-tester', label: 'RegEx Tester' },
      { href: '/url-parser', label: 'URL Parser' },
      { href: '/uuid-generator', label: 'UUID Generator' },
      { href: '/timestamp-converter', label: 'Timestamp' },
      { href: '/cron-generator', label: 'Cron Generator' },
      { href: '/image-compressor', label: 'Image Compressor' },
    ],
  },
];

const allTools = toolGroups.flatMap(group => group.tools);

export function SplitLayout({ left, right }: SplitLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTools = allTools.filter(tool => 
    tool.label.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGroups = search
    ? [{ name: 'Results', tools: filteredTools }]
    : toolGroups;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (document.activeElement === inputRef.current) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredTools.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
          e.preventDefault();
          router.push(filteredTools[selectedIndex].href);
        } else if (e.key === 'Escape') {
          inputRef.current?.blur();
          setSearch('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredTools, selectedIndex, router]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  let globalIndex = -1;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-stone-950">
      <header className="h-12 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4 shrink-0 bg-stone-100 dark:bg-stone-900">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-stone-900 to-stone-700 dark:from-stone-100 dark:to-stone-300 rounded flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white dark:text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7V4h3M4 17v3h3M20 7V4h-3M20 17v3h-3M9 9h6v6H9z"/>
            </svg>
          </div>
          <span className="text-base font-semibold text-stone-900 dark:text-stone-100">TypeDock</span>
        </Link>
        <div className="flex items-center gap-2">
          <a 
            href="https://github.com/yoni-crypto/typedock" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <aside className="w-56 border-r border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex flex-col shrink-0">
          <div className="p-2 border-b border-stone-200 dark:border-stone-800">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1.5 pr-12 text-xs bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
              />
              {!search && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
                  <kbd className="px-1 py-0.5 text-[10px] font-medium bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-600 rounded">⌘</kbd>
                  <kbd className="px-1 py-0.5 text-[10px] font-medium bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-600 rounded">K</kbd>
                </div>
              )}
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <nav className="py-2 overflow-y-auto flex-1">
            {filteredGroups.map((group) => (
              <div key={group.name} className="mb-3">
                <div className="px-6 py-1 text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  {group.name}
                </div>
                {group.tools.map((tool) => {
                  globalIndex++;
                  const idx = globalIndex;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`block pl-8 pr-4 py-1.5 text-sm border-l-2 transition-colors ${
                        pathname === tool.href
                          ? 'border-stone-900 dark:border-stone-100 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium'
                          : idx === selectedIndex && search
                          ? 'border-stone-400 dark:border-stone-600 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                          : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-white dark:hover:bg-stone-800'
                      }`}
                    >
                      {tool.label}
                    </Link>
                  );
                })}
              </div>
            ))}
            {filteredTools.length === 0 && (
              <div className="px-4 py-2 text-xs text-stone-500 dark:text-stone-400">
                No tools found
              </div>
            )}
          </nav>
          
          {/* Footer */}
          <div className="px-4 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">
            <div className="text-[10px] text-stone-500 dark:text-stone-500">
              Built by{' '}
              <a 
                href="https://github.com/yoni-crypto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-stone-700 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-300 hover:underline"
              >
                yoni-crypto
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex min-w-0">
          <div className="flex-1 flex flex-col min-w-0 border-r border-stone-200 dark:border-stone-800">
            {left}
          </div>
          <div className="flex-1 flex flex-col min-w-0 bg-stone-50 dark:bg-stone-950">
            {right}
          </div>
        </main>
      </div>
    </div>
  );
}
