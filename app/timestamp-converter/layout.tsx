import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'timestamp-converter';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Enter a Unix timestamp or human-readable date',
    'View the instant conversion to all formats',
    'Check relative time from now',
    'Copy the converted timestamp to clipboard',
  ],
  [
    {
      question: 'Is this timestamp converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What timestamp formats are supported?',
      answer: 'The tool supports Unix timestamps in seconds, milliseconds, and microseconds, as well as ISO 8601 and various date string formats.',
    },
    {
      question: 'Can I convert to different timezones?',
      answer: 'Yes! The tool displays the converted time in multiple timezones including UTC and your local timezone.',
    },
    {
      question: 'What is relative time?',
      answer: 'Relative time shows how long ago or how far in the future a timestamp is from the current moment (e.g., "2 hours ago" or "in 3 days").',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All conversion happens client-side in your browser. Your timestamps never leave your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Timestamp Converter', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1789 }
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
