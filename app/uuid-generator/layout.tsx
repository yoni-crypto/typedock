import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'UUID Generator - Free Online Tool',
  description: 'Generate v4 UUIDs instantly. Bulk UUID generation with one click. Free, fast, and 100% client-side.',
  path: '/uuid-generator',
  keywords: [
    'uuid generator',
    'uuid v4 generator',
    'generate uuid online',
    'bulk uuid generator',
    'random uuid',
    'guid generator',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
