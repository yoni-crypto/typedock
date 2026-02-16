import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to TypeScript - TypeDock',
  description: 'Convert JSON to TypeScript interfaces instantly. Fast, accurate, client-side type generation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
