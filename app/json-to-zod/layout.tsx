import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'JSON to Zod Schema Converter - Free Online Tool',
  description: 'Generate Zod schemas from JSON with runtime validation. Create TypeScript types and Zod validators instantly. Supports strict mode, optional fields, and nested objects. 100% free.',
  path: '/json-to-zod',
  keywords: [
    'json to zod',
    'zod schema generator',
    'json to zod schema',
    'zod validator generator',
    'runtime validation',
    'zod typescript',
    'generate zod from json',
    'zod schema builder',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
