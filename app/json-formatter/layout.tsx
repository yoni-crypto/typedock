import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'JSON Formatter - Free Online Tool',
  description: 'Format, validate, minify, and beautify JSON instantly. Sort keys, remove nulls, and validate JSON syntax. Free, fast, and 100% client-side.',
  path: '/json-formatter',
  keywords: [
    'json formatter',
    'json beautifier',
    'json validator',
    'json minifier',
    'prettify json',
    'format json online',
    'json tool',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
