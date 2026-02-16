import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to Zod - TypeDock',
  description: 'Generate Zod schemas from JSON with runtime validation. Fast, accurate, client-side.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
