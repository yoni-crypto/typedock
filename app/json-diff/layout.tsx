import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'JSON Diff Tool',
  description: 'Compare two JSON objects and see the differences. Visual diff tool for debugging API changes, finding added, removed, and modified fields.',
  path: '/json-diff',
  keywords: ['json diff', 'json compare', 'json difference', 'api diff', 'json comparison tool'],
});

export default function JsonDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
