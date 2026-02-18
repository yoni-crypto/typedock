import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50 dark:from-stone-950 dark:to-stone-900">
      <header className="border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-stone-900 to-stone-700 dark:from-stone-100 dark:to-stone-300 rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-stone-900 font-bold text-sm">TD</span>
            </div>
            <Link href="/" className="text-xl font-bold text-stone-900 dark:text-stone-100">
              TypeDock
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/yoni-crypto/typedock" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              GitHub
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <p className="text-stone-600 dark:text-stone-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Introduction</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              TypeDock ("we", "our", or "us") operates https://typedock.vercel.app. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Data Processing</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              All tools on TypeDock run 100% client-side in your browser. Your data is processed locally on your device and never sent to our servers. We do not store, collect, or have access to any data you input into our tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Analytics</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              We use analytics services (PostHog and Vercel Analytics) to understand how our service is used. These services may collect:
            </p>
            <ul className="list-disc pl-6 text-stone-600 dark:text-stone-400 mb-4">
              <li>Page views and navigation patterns</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Time and date of visit</li>
            </ul>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Analytics are only enabled if you accept cookies via our cookie consent banner. You can decline analytics and still use all features of TypeDock.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Cookies</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              We use cookies only for analytics purposes and only if you consent. Cookies used:
            </p>
            <ul className="list-disc pl-6 text-stone-600 dark:text-stone-400 mb-4">
              <li><strong>PostHog cookies</strong> - Track anonymous usage statistics</li>
              <li><strong>Vercel Analytics cookies</strong> - Track page views and performance</li>
              <li><strong>localStorage</strong> - Store your cookie consent preference and theme preference</li>
            </ul>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              You can clear cookies at any time through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Third-Party Services</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-stone-600 dark:text-stone-400 mb-4">
              <li><strong>Vercel</strong> - Hosting and analytics</li>
              <li><strong>PostHog</strong> - Analytics and user behavior tracking</li>
            </ul>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              These services have their own privacy policies governing their use of your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Your Rights</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-stone-600 dark:text-stone-400 mb-4">
              <li>Decline analytics cookies</li>
              <li>Clear your browser cookies at any time</li>
              <li>Use all TypeDock tools without accepting analytics</li>
              <li>Request information about data we collect (which is minimal)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Data Security</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Since all data processing happens in your browser, your data never leaves your device. We do not store or transmit your tool inputs or outputs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Children's Privacy</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Changes to This Policy</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Contact Us</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              If you have questions about this privacy policy, please open an issue on our{' '}
              <a href="https://github.com/yoni-crypto/typedock/issues" target="_blank" rel="noopener noreferrer" className="text-stone-900 dark:text-stone-100 underline">
                GitHub repository
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
