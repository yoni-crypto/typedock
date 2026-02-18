'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { homePageSchemas, faqSchema } from '@/lib/seo/structuredData';

const allTools = [
  { name: 'JSON to TypeScript', href: '/json-to-typescript', desc: 'Generate TypeScript interfaces', color: 'from-blue-500 to-blue-600', category: 'JSON' },
  { name: 'JSON to Zod', href: '/json-to-zod', desc: 'Create Zod validation schemas', color: 'from-purple-500 to-purple-600', category: 'JSON' },
  { name: 'JSON Formatter', href: '/json-formatter', desc: 'Format and beautify JSON', color: 'from-green-500 to-green-600', category: 'JSON' },
  { name: 'JSON Path', href: '/json-path', desc: 'Query JSON with expressions', color: 'from-lime-500 to-lime-600', category: 'JSON' },
  { name: 'JSON Minify', href: '/json-minify', desc: 'Compress JSON size', color: 'from-green-500 to-green-600', category: 'JSON' },
  { name: 'JSON to CSV', href: '/json-to-csv', desc: 'Export JSON to CSV', color: 'from-emerald-500 to-emerald-600', category: 'JSON' },
  { name: 'JSON to TOML', href: '/json-to-toml', desc: 'Convert to TOML format', color: 'from-rose-500 to-rose-600', category: 'JSON' },
  { name: 'JSON to ENV', href: '/json-to-env', desc: 'Generate env variables', color: 'from-amber-500 to-amber-600', category: 'JSON' },
  { name: 'CSV to JSON', href: '/csv-to-json', desc: 'Convert CSV to JSON', color: 'from-lime-500 to-lime-600', category: 'JSON' },
  { name: 'XML to JSON', href: '/xml-to-json', desc: 'XML ↔ JSON converter', color: 'from-emerald-500 to-emerald-600', category: 'JSON' },
  { name: 'YAML to JSON', href: '/yaml-to-json', desc: 'YAML to JSON converter', color: 'from-sky-500 to-sky-600', category: 'JSON' },
  { name: 'JSON to YAML', href: '/json-to-yaml', desc: 'JSON to YAML converter', color: 'from-indigo-400 to-indigo-500', category: 'JSON' },
  { name: 'JSON Diff', href: '/json-diff', desc: 'Compare JSON objects', color: 'from-slate-500 to-slate-600', category: 'JSON' },
  { name: 'Validator', href: '/validator', desc: 'Validate with Zod', color: 'from-zinc-500 to-zinc-600', category: 'JSON' },
  { name: 'JSON to JSON Schema', href: '/json-to-json-schema', desc: 'Generate JSON Schema', color: 'from-stone-500 to-stone-600', category: 'JSON' },
  { name: 'JSON Schema to TS', href: '/json-schema-to-typescript', desc: 'Schema to TypeScript', color: 'from-neutral-500 to-neutral-600', category: 'JSON' },
  { name: 'TypeScript to Zod', href: '/typescript-to-zod', desc: 'TS to Zod schema', color: 'from-gray-500 to-gray-600', category: 'JSON' },
  { name: 'Zod to TypeScript', href: '/zod-to-typescript', desc: 'Zod to TypeScript', color: 'from-blue-400 to-blue-500', category: 'JSON' },
  { name: 'Base64', href: '/base64', desc: 'Encode/decode Base64', color: 'from-pink-500 to-pink-600', category: 'Encoding' },
  { name: 'URL Encoder', href: '/url-encoder', desc: 'Encode/decode URLs', color: 'from-rose-500 to-rose-600', category: 'Encoding' },
  { name: 'HTML Entities', href: '/html-entities', desc: 'Encode/decode entities', color: 'from-orange-500 to-orange-600', category: 'Encoding' },
  { name: 'Unicode Escape', href: '/unicode-escape', desc: 'Escape Unicode chars', color: 'from-violet-500 to-violet-600', category: 'Encoding' },
  { name: 'HTML Minifier', href: '/html-minifier', desc: 'Minify & beautify HTML', color: 'from-orange-400 to-orange-500', category: 'Encoding' },
  { name: 'XML Formatter', href: '/xml-formatter', desc: 'Format & minify XML', color: 'from-cyan-400 to-cyan-500', category: 'Encoding' },
  { name: 'SQL Formatter', href: '/sql-formatter', desc: 'Format SQL queries', color: 'from-cyan-400 to-cyan-500', category: 'Encoding' },
  { name: 'Markdown to HTML', href: '/markdown-to-html', desc: 'Convert Markdown to HTML', color: 'from-purple-400 to-purple-500', category: 'Converters' },
  { name: 'HTML to Markdown', href: '/html-to-markdown', desc: 'Convert HTML to Markdown', color: 'from-pink-400 to-pink-500', category: 'Converters' },
  { name: 'TOML to JSON', href: '/toml-to-json', desc: 'Parse TOML files', color: 'from-pink-500 to-pink-600', category: 'Converters' },
  { name: 'Base Converter', href: '/base-converter', desc: 'Binary, Octal, Decimal, Hex', color: 'from-green-400 to-green-500', category: 'Converters' },
  { name: 'Case Converter', href: '/case-converter', desc: 'camelCase, snake_case, kebab-case', color: 'from-orange-400 to-orange-500', category: 'Converters' },
  { name: 'Password Generator', href: '/password-generator', desc: 'Generate secure passwords', color: 'from-violet-400 to-violet-500', category: 'Security' },
  { name: 'Hash Generator', href: '/hash-generator', desc: 'MD5, SHA-256, SHA-512', color: 'from-red-500 to-red-600', category: 'Security' },
  { name: 'JWT Decoder', href: '/jwt-decoder', desc: 'Decode JWT tokens', color: 'from-yellow-500 to-yellow-600', category: 'Security' },
  { name: 'JWT Generator', href: '/jwt-generator', desc: 'Create JWT tokens', color: 'from-purple-400 to-purple-500', category: 'Security' },
  { name: 'Bcrypt', href: '/bcrypt', desc: 'Hash & verify passwords', color: 'from-emerald-400 to-emerald-500', category: 'Security' },
  { name: 'CSS Box Shadow', href: '/css-box-shadow', desc: 'Visual shadow builder', color: 'from-slate-500 to-slate-600', category: 'Design' },
  { name: 'CSS Gradient', href: '/css-gradient', desc: 'Create CSS gradients', color: 'from-fuchsia-500 to-fuchsia-600', category: 'Design' },
  { name: 'Color Converter', href: '/color-converter', desc: 'HEX, RGB, HSL converter', color: 'from-cyan-500 to-cyan-600', category: 'Design' },
  { name: 'QR Generator', href: '/qr-generator', desc: 'Generate QR codes', color: 'from-indigo-500 to-indigo-600', category: 'Design' },
  { name: 'ASCII Art', href: '/ascii-art', desc: 'Text to ASCII art', color: 'from-fuchsia-500 to-fuchsia-600', category: 'Design' },
  { name: 'Image Compressor', href: '/image-compressor', desc: 'Compress images', color: 'from-violet-500 to-violet-600', category: 'Design' },
  { name: 'RegEx Tester', href: '/regex-tester', desc: 'Test regex with highlighting', color: 'from-orange-500 to-orange-600', category: 'Developer' },
  { name: 'cURL to Fetch', href: '/curl-to-fetch', desc: 'Convert cURL commands', color: 'from-blue-500 to-blue-600', category: 'Developer' },
  { name: 'User Agent Parser', href: '/user-agent-parser', desc: 'Detect browser & OS', color: 'from-cyan-500 to-cyan-600', category: 'Developer' },
  { name: 'Semver Checker', href: '/semver-checker', desc: 'Version comparison', color: 'from-indigo-500 to-indigo-600', category: 'Developer' },
  { name: 'Text Diff', href: '/text-diff', desc: 'Compare two texts', color: 'from-red-400 to-red-500', category: 'Developer' },
  { name: 'URL Parser', href: '/url-parser', desc: 'Parse & build URLs', color: 'from-blue-400 to-blue-500', category: 'Developer' },
  { name: 'Cron Generator', href: '/cron-generator', desc: 'Build cron expressions', color: 'from-amber-400 to-amber-500', category: 'Developer' },
  { name: 'Lorem Ipsum', href: '/lorem-ipsum', desc: 'Generate placeholder text', color: 'from-teal-400 to-teal-500', category: 'Developer' },
  { name: 'Timestamp Converter', href: '/timestamp-converter', desc: 'Unix timestamp tools', color: 'from-amber-500 to-amber-600', category: 'Developer' },
  { name: 'UUID Generator', href: '/uuid-v7', desc: 'UUID v1, v4 & v7 generator', color: 'from-pink-400 to-pink-500', category: 'Developer' },
];

const categories = ['All', 'JSON', 'Encoding', 'Converters', 'Security', 'Design', 'Developer'];

const homeFAQs = [
  {
    question: 'Are TypeDock tools really free?',
    answer: 'Yes! All 52 tools are completely free to use. No sign-up required, no credit card needed, and no usage limits.',
  },
  {
    question: 'Is my data safe with TypeDock?',
    answer: 'Absolutely! All tools run 100% client-side in your browser. Your data never leaves your device or gets sent to any server.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account or sign-up is required. Just visit the tool you need and start using it immediately.',
  },
  {
    question: 'Can I use these tools offline?',
    answer: 'Yes! Since all processing happens in your browser, you can use the tools offline after the initial page load.',
  },
  {
    question: 'What makes TypeDock different from other tool sites?',
    answer: 'TypeDock focuses on privacy (no data sent to servers), quality (52 carefully crafted tools), and developer experience (clean UI, instant results).',
  },
];

const schemas = [...homePageSchemas(), faqSchema(homeFAQs)];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                           tool.desc.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="min-h-screen bg-gradient-to-b from-white to-stone-50 dark:from-stone-950 dark:to-stone-900">
        <header className="border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-stone-900 to-stone-700 dark:from-stone-100 dark:to-stone-300 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white dark:text-stone-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7V4h3M4 17v3h3M20 7V4h-3M20 17v3h-3M9 9h6v6H9z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-stone-900 dark:text-stone-100">TypeDock</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/yoni-crypto/typedock" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                GitHub
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4 tracking-tight">
              52 Free Developer Tools for Modern Development
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 mb-6 max-w-2xl">
              Convert JSON to TypeScript, test regex patterns, generate QR codes, and more. All tools run locally in your browser—no sign-up, no tracking, 100% privacy-focused.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>100% Client-Side</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No Sign-Up Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="max-w-7xl mx-auto px-6 py-16">
          {/* Header with Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              {/* Left: Heading */}
              <div>
                <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">All Tools</h2>
                <p className="text-stone-600 dark:text-stone-400">52 powerful tools to boost your productivity</p>
              </div>
              
              {/* Right: Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 lg:w-auto w-full">
                {/* Search */}
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                  />
                </div>
                
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-40 px-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400 text-stone-900 dark:text-stone-100 cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Tools Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-all hover:shadow-lg overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tool.color} opacity-10 rounded-bl-full transition-all group-hover:w-24 group-hover:h-24`}></div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 relative z-10">{tool.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 rounded-full">
                    {tool.category}
                  </span>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 relative z-10">{tool.desc}</p>
                <div className="mt-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors relative z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <p className="text-stone-500 dark:text-stone-400">No tools found matching your search.</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                className="mt-4 px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <footer className="border-t border-stone-200 dark:border-stone-800 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-stone-900 to-stone-700 dark:from-stone-100 dark:to-stone-300 rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-stone-900 font-bold text-sm">TD</span>
                </div>
                <span className="text-sm text-stone-600 dark:text-stone-400">© 2024 TypeDock. Built with Next.js</span>
              </div>
              <div className="flex gap-6">
                <a href="https://github.com/yoni-crypto/typedock" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  GitHub
                </a>
                <a href="#tools" className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  All Tools
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
