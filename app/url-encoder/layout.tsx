import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'URL Encoder/Decoder - Free Online Tool',
  description: 'Encode and decode URLs instantly. Convert special characters for URLs. Free, fast, and 100% client-side.',
  path: '/url-encoder',
  keywords: [
    'url encoder',
    'url decoder',
    'encode url online',
    'decode url online',
    'url escape',
    'percent encoding',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
