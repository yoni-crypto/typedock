import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'TypeScript to Zod Converter',
  description: 'Convert TypeScript interfaces and types to Zod schemas instantly. Generate runtime validation from your TypeScript types.',
  path: '/typescript-to-zod',
  keywords: ['typescript to zod', 'zod generator', 'typescript converter', 'zod schema from typescript'],
});

export default function TypescriptToZodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
