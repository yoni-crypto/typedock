import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'json-path';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste or upload your JSON data',
    'Enter a JSONPath query expression',
    'Click Query to extract data',
    'View results in a clean, formatted list',
    'Copy results to clipboard',
  ],
  [
    {
      question: 'What is JSONPath?',
      answer: 'JSONPath is a query language for JSON, similar to XPath for XML. It allows you to extract and filter data from JSON documents using a simple, expressive syntax.',
    },
    {
      question: 'Is this JSONPath tool free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What JSONPath expressions are supported?',
      answer: 'We support the standard JSONPath syntax including dot notation ($.store.book), bracket notation ($["store"]["book"]), wildcards ($.store.*), array indices ($.book[0]), filters ($.book[?(@.price<10)]), and recursive descent ($..author).',
    },
    {
      question: 'Can I filter data based on conditions?',
      answer: 'Yes! Use filter expressions like $.store.book[?(@.price < 10)] to find books under $10, or $.store.book[?(@.author == "Author Name")] to find specific authors.',
    },
    {
      question: 'Is my JSON data safe?',
      answer: '100%! All processing happens client-side in your browser. Your JSON data never leaves your device or gets sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JSON Path', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 2156 }
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
