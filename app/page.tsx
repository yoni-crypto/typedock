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
      <div className="min-h-screen flex flex-col bg-white dark:bg-stone-950">
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="text-base font-semibold text-stone-900 dark:text-stone-100">
            TypeDock
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 max-w-2xl mx-auto px-6 py-20 w-full">
        <div className="mb-12">
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-3 font-medium">Developer Tools</p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 mb-4">
            TypeDock
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
            Convert JSON to TypeScript interfaces and Zod schemas. 
            Runs entirely in your browser.
          </p>
        </div>

        <div className="space-y-3 mb-16">
          <Link
            href="/json-to-typescript"
            className="block p-5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-stone-900 dark:text-stone-100 mb-1">JSON to TypeScript</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">Generate interfaces with smart type inference</p>
              </div>
              <span className="text-stone-400 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">→</span>
            </div>
          </Link>

          <Link
            href="/json-to-zod"
            className="block p-5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-stone-900 dark:text-stone-100 mb-1">JSON to Zod</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">Create schemas with runtime validation</p>
              </div>
              <span className="text-stone-400 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">→</span>
            </div>
          </Link>
        </div>

        <div className="border-t border-stone-200 dark:border-stone-800 pt-10">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-6 uppercase tracking-wide">Why TypeDock</h3>
          <dl className="grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="font-medium text-stone-900 dark:text-stone-100 text-sm mb-1">Smart inference</dt>
              <dd className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Detects optional fields, unions, and literals from multiple samples
              </dd>
            </div>
            <div>
              <dt className="font-medium text-stone-900 dark:text-stone-100 text-sm mb-1">No setup</dt>
              <dd className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                No accounts or API calls. Everything processes locally
              </dd>
            </div>
            <div>
              <dt className="font-medium text-stone-900 dark:text-stone-100 text-sm mb-1">Clean output</dt>
              <dd className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Production-ready types with no implicit any
              </dd>
            </div>
          </dl>
        </div>
      </main>

      <footer className="border-t border-stone-200 dark:border-stone-800 py-6 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-sm text-stone-500 dark:text-stone-400">
          <p>Built with Next.js and TypeScript</p>
          <a 
            href="https://github.com/yoni-crypto/typedock" 
            className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
    </>
  );
}
