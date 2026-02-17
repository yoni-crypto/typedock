import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Hash Generator - Free Online Tool',
  description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly. Free, fast, and 100% client-side hash generator for checksums and testing.',
  path: '/hash-generator',
  keywords: [
    'hash generator',
    'md5 generator',
    'sha256 generator',
    'sha512 generator',
    'checksum generator',
    'hash calculator',
    'online hash tool',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
