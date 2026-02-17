import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'typescript-to-zod';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your TypeScript types or interfaces',
    'Configure conversion options for Zod schemas',
    'View the generated Zod validation schemas',
    'Copy the Zod code to your clipboard',
  ],
  [
    {
      question: 'Is this TypeScript to Zod converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What TypeScript features are supported?',
      answer: 'The tool supports interfaces, type aliases, enums, generics, union types, intersection types, and complex nested structures.',
    },
    {
      question: 'Can I convert multiple types at once?',
      answer: 'Yes! You can paste multiple interfaces or type definitions and convert them all in one operation.',
    },
    {
      question: 'How are optional fields handled?',
      answer: 'Optional TypeScript fields (marked with ?) are converted to Zod schemas with the .optional() modifier.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All conversion happens client-side in your browser. Your TypeScript code never leaves your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'TypeScript to Zod', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1123 }
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
