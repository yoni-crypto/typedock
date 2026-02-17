import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'Zod to TypeScript Converter',
  description: 'Extract TypeScript types from Zod schemas using z.infer. Generate type-safe TypeScript interfaces from your Zod validation schemas.',
  path: '/zod-to-typescript',
  keywords: ['zod to typescript', 'z.infer', 'zod types', 'extract types from zod', 'zod type inference'],
});

export default function ZodToTypescriptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
