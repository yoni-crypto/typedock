import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'csv-to-json';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste CSV data or upload a CSV file',
    'Configure delimiter and header options',
    'View the converted JSON instantly',
    'Copy or download the JSON output',
  ],
  [
    {
      question: 'Is this CSV to JSON converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What delimiters are supported?',
      answer: 'The tool supports comma, semicolon, tab, and pipe delimiters. It can also auto-detect the delimiter used in your CSV.',
    },
    {
      question: 'Can I convert large CSV files?',
      answer: 'Yes! The tool handles large CSV files efficiently, processing thousands of rows directly in your browser.',
    },
    {
      question: 'Does it support nested JSON objects?',
      answer: 'Yes! You can use dot notation in headers (e.g., "user.name") to create nested JSON structures.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All conversion happens client-side in your browser. Your CSV data never leaves your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'CSV to JSON', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1987 }
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
