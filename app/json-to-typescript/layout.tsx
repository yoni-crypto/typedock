import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'JSON to TypeScript Converter - Free Online Tool',
  description: 'Convert JSON to TypeScript interfaces instantly. Smart type inference, optional field detection, union types, and nested object support. Free, fast, and 100% client-side.',
  path: '/json-to-typescript',
  keywords: [
    'json to typescript converter',
    'json to typescript interface',
    'generate typescript from json',
    'typescript interface generator',
    'json to ts online',
    'typescript type generator',
    'convert json to typescript',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
