import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'UUID Generator - Generate UUID v4 & v7 Online',
  description: 'Generate UUIDs v4 (random) and v7 (time-ordered). Cryptographically secure. Free online UUID generator. 100% client-side.',
  path: '/uuid-v7',
  keywords: ['uuid generator', 'uuid v7', 'uuid v4', 'generate uuid', 'uuid maker', 'uuid creator', 'uuid random', 'uuid time-ordered'],
});

const structuredData = toolPageSchemas('UUID Generator', 'Generate UUID v4 and v7 with auto-refresh.', `${siteConfig.url}/uuid-v7`, ['UUID v4 (random)', 'UUID v7 (time-ordered)', 'Generate 1-100 at once', 'Auto-refresh mode', 'Copy all', '100% client-side'], ['Select UUID version', 'Set quantity', 'Generate'], [{question: 'Is this UUID generator free?', answer: 'Yes, completely free!'}, {question: 'What is UUID v7?', answer: 'UUID v7 is a time-ordered UUID that sorts lexicographically by creation time.'}, {question: 'Can I generate multiple UUIDs?', answer: 'Yes, generate 1-100 UUIDs at once.'}, {question: 'Is it secure?', answer: 'Yes, uses cryptographically secure random values.'}], [{name: 'Home', url: siteConfig.url}, {name: 'UUID Generator', url: `${siteConfig.url}/uuid-v7`}], {value: 4.9, count: 1567});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {structuredData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      {children}
    </>
  );
}
