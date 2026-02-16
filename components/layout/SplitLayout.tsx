'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const tools = [
  { href: '/json-to-typescript', label: 'JSON → TypeScript' },
  { href: '/json-to-zod', label: 'JSON → Zod' },
];

export function SplitLayout({ left, right }: SplitLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-stone-950">
      <header className="h-12 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4 shrink-0 bg-white dark:bg-stone-950">
        <Link href="/" className="text-base font-semibold text-stone-900 dark:text-stone-100">
          TypeDock
        </Link>
        <ThemeToggle />
      </header>

      <div className="flex-1 flex min-h-0">
        <aside className="w-48 border-r border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex flex-col shrink-0">
          <nav className="py-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`block px-4 py-2 text-sm border-l-2 transition-colors ${
                  pathname === tool.href
                    ? 'border-stone-900 dark:border-stone-100 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium'
                    : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-white dark:hover:bg-stone-800'
                }`}
              >
                {tool.label}
              </Link>
            ))}
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
