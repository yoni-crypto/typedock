import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'json-to-csv';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your JSON array of objects',
    'Choose delimiter (comma, tab, semicolon, pipe)',
    'Toggle "Flatten nested objects" if needed',
    'Click Convert to CSV',
    'Copy or download the result',
  ],
  [
    {
      question: 'Can I convert nested JSON objects?',
      answer: 'Yes! Enable "Flatten nested objects" to convert nested objects into dot-notation columns like "address.street" and "address.city".',
    },
    {
      question: 'What delimiters are supported?',
      answer: 'We support comma (,), tab (\\t), semicolon (;), and pipe (|). Tab-delimited files are great for Excel, semicolon for European locales, and pipe for data with lots of commas.',
    },
    {
      question: 'How are special characters handled?',
      answer: 'Special characters in CSV values (delimiters, newlines, quotes) are automatically escaped according to RFC 4180. Quotes are doubled, and values containing delimiters are wrapped in quotes.',
    },
    {
      question: 'What about arrays in JSON?',
      answer: 'Arrays are converted to comma-separated strings within a single cell. For example, ["red", "blue", "green"] becomes "red, blue, green" in the CSV.',
    },
    {
      question: 'Is there a file size limit?',
      answer: 'No! Since all processing happens in your browser, you can convert very large JSON files. The only limit is your computer\'s memory.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JSON to CSV', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 2847 }
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
