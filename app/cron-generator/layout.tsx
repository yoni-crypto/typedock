import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Cron Expression Generator - Build & Visualize Cron Jobs',
  description: 'Build cron expressions with an easy visual interface. See next run times and human-readable descriptions. Free online cron generator. 100% client-side.',
  path: '/cron-generator',
  keywords: ['cron generator', 'cron expression', 'cron job', 'cron schedule', 'crontab', 'cron builder', 'cron visualizer', 'cron next run', 'cron parser', 'cron scheduler'],
});

const structuredData = toolPageSchemas('Cron Expression Generator', 'Build cron expressions visually with next run times.', `${siteConfig.url}/cron-generator`, ['Visual cron builder', 'Presets for common schedules', 'Next 5 runs preview', 'Human-readable description', 'Copy cron expression', '100% client-side'], ['Select or type cron expression', 'View next scheduled runs', 'Copy for use'], [{question: 'Is this cron generator free?', answer: 'Yes, completely free!'}, {question: 'What is UUID v7?', answer: 'UUID v7 is a time-ordered UUID that sorts lexicographically by creation time.'}, {question: 'Can I generate multiple UUIDs?', answer: 'Yes, generate 1-100 UUIDs at once.'}, {question: 'Is it secure?', answer: 'Yes, uses cryptographically secure random values.'}], [{name: 'Home', url: siteConfig.url}, {name: 'Cron Generator', url: `${siteConfig.url}/cron-generator`}], {value: 4.8, count: 645});

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
