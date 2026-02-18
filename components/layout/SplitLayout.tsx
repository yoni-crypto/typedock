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
      <header className="h-12 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4 shrink-0 bg-white dark:bg-stone-950">
        <Link href="/" className="text-base font-semibold text-stone-900 dark:text-stone-100">
          TypeDock
        </Link>
        <ThemeToggle />
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
