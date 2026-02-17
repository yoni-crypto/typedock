import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Timestamp Converter - Free Online Tool',
  description: 'Convert Unix timestamps to human-readable dates. ISO 8601, UTC, and local time formats. Free, fast, and 100% client-side.',
  path: '/timestamp-converter',
  keywords: [
    'timestamp converter',
    'unix timestamp converter',
    'epoch converter',
    'timestamp to date',
    'unix time converter',
    'epoch time converter',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
