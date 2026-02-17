import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Base64 Encoder/Decoder - Free Online Tool',
  description: 'Encode and decode Base64 strings instantly. Convert text to Base64 or decode Base64 to text. Free, fast, and 100% client-side.',
  path: '/base64',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'base64 converter',
    'encode base64 online',
    'decode base64 online',
    'base64 tool',
    'text to base64',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
