import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'JWT Decoder - Free Online Tool',
  description: 'Decode JWT tokens instantly. View header, payload, and signature without validation. Free, fast, and 100% client-side.',
  path: '/jwt-decoder',
  keywords: [
    'jwt decoder',
    'jwt token decoder',
    'decode jwt online',
    'jwt parser',
    'json web token decoder',
    'jwt debugger',
    'jwt viewer',
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
