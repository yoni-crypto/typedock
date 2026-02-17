import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { websiteSchema, organizationSchema } from '@/lib/seo/schema';

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-stone-50 dark:from-stone-950 dark:to-stone-900">
        <header className="border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-stone-900 to-stone-700 dark:from-stone-100 dark:to-stone-300 rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-stone-900 font-bold text-sm">TD</span>
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
              Essential Developer Tools
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 mb-6 max-w-2xl">
              23 powerful, privacy-focused tools for modern development. Convert formats, test patterns, generate code—all running locally in your browser.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">All Tools</h2>
            <p className="text-stone-600 dark:text-stone-400">23 powerful tools to boost your productivity</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'JSON to TypeScript', href: '/json-to-typescript', desc: 'Generate TypeScript interfaces', color: 'from-blue-500 to-blue-600' },
              { name: 'JSON to Zod', href: '/json-to-zod', desc: 'Create Zod validation schemas', color: 'from-purple-500 to-purple-600' },
              { name: 'JSON Formatter', href: '/json-formatter', desc: 'Format and beautify JSON', color: 'from-green-500 to-green-600' },
              { name: 'RegEx Tester', href: '/regex-tester', desc: 'Test regex with highlighting', color: 'from-orange-500 to-orange-600' },
              { name: 'Base64 Encoder', href: '/base64', desc: 'Encode/decode Base64', color: 'from-pink-500 to-pink-600' },
              { name: 'Color Converter', href: '/color-converter', desc: 'HEX, RGB, HSL converter', color: 'from-cyan-500 to-cyan-600' },
              { name: 'QR Generator', href: '/qr-generator', desc: 'Generate QR codes', color: 'from-indigo-500 to-indigo-600' },
              { name: 'UUID Generator', href: '/uuid-generator', desc: 'Generate UUIDs v1/v4', color: 'from-teal-500 to-teal-600' },
              { name: 'Hash Generator', href: '/hash-generator', desc: 'MD5, SHA-256, SHA-512', color: 'from-red-500 to-red-600' },
              { name: 'JWT Decoder', href: '/jwt-decoder', desc: 'Decode JWT tokens', color: 'from-yellow-500 to-yellow-600' },
              { name: 'CSV to JSON', href: '/csv-to-json', desc: 'Convert CSV to JSON', color: 'from-lime-500 to-lime-600' },
              { name: 'XML to JSON', href: '/xml-to-json', desc: 'XML ↔ JSON converter', color: 'from-emerald-500 to-emerald-600' },
              { name: 'YAML to JSON', href: '/yaml-to-json', desc: 'YAML ↔ JSON converter', color: 'from-sky-500 to-sky-600' },
              { name: 'Image Compressor', href: '/image-compressor', desc: 'Compress images', color: 'from-violet-500 to-violet-600' },
              { name: 'ASCII Art', href: '/ascii-art', desc: 'Text to ASCII art', color: 'from-fuchsia-500 to-fuchsia-600' },
              { name: 'URL Encoder', href: '/url-encoder', desc: 'Encode/decode URLs', color: 'from-rose-500 to-rose-600' },
              { name: 'Timestamp Converter', href: '/timestamp-converter', desc: 'Unix timestamp tools', color: 'from-amber-500 to-amber-600' },
              { name: 'JSON Diff', href: '/json-diff', desc: 'Compare JSON objects', color: 'from-slate-500 to-slate-600' },
              { name: 'Validator', href: '/validator', desc: 'Validate with Zod', color: 'from-zinc-500 to-zinc-600' },
              { name: 'JSON to JSON Schema', href: '/json-to-json-schema', desc: 'Generate JSON Schema', color: 'from-stone-500 to-stone-600' },
              { name: 'JSON Schema to TS', href: '/json-schema-to-typescript', desc: 'Schema to TypeScript', color: 'from-neutral-500 to-neutral-600' },
              { name: 'TypeScript to Zod', href: '/typescript-to-zod', desc: 'TS to Zod schema', color: 'from-gray-500 to-gray-600' },
              { name: 'Zod to TypeScript', href: '/zod-to-typescript', desc: 'Zod to TypeScript', color: 'from-blue-400 to-blue-500' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-all hover:shadow-lg overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tool.color} opacity-10 rounded-bl-full transition-all group-hover:w-24 group-hover:h-24`}></div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1 relative z-10">{tool.name}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 relative z-10">{tool.desc}</p>
                <div className="mt-3 text-stone-400 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors relative z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
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
