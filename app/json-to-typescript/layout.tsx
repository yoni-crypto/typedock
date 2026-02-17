import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'json-to-typescript';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your JSON data into the left editor',
    'View automatically generated TypeScript interface',
    'Use the "Generate Mock" button to create sample data',
    'Copy the TypeScript code to your clipboard',
  ],
  [
    {
      question: 'Is this JSON to TypeScript converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and no credit card needed.',
    },
    {
      question: 'Does this tool support nested JSON objects?',
      answer: 'Absolutely! The converter intelligently detects nested objects and generates properly typed interfaces with all nested structures preserved.',
    },
    {
      question: 'Can I convert multiple JSON samples at once?',
      answer: 'Yes! Paste multiple JSON objects separated by newlines, and the tool will merge them into a single comprehensive TypeScript interface.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All processing happens client-side in your browser. Your JSON data never leaves your device or gets sent to any server.',
    },
    {
      question: 'What TypeScript features are supported?',
      answer: 'The generator creates interfaces with proper types, optional fields, union types, array types, nested interfaces, and enum detection.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JSON to TypeScript', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 2847 }
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
