import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'json-to-zod';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your JSON data into the left editor',
    'View automatically generated Zod validation schema',
    'Customize validation rules and error messages',
    'Copy the Zod schema code to your clipboard',
  ],
  [
    {
      question: 'Is this JSON to Zod converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Does this tool support nested objects and arrays?',
      answer: 'Absolutely! The converter generates Zod schemas for nested objects and arrays with full type inference.',
    },
    {
      question: 'Can I add custom validations to the generated schemas?',
      answer: 'Yes! The tool generates base schemas that you can extend with custom validations like min, max, email, url, and more.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All processing happens client-side in your browser. Your JSON data never leaves your device.',
    },
    {
      question: 'What Zod features are supported?',
      answer: 'The generator creates schemas with primitive types, nested objects, arrays, enums, optional fields, unions, and full TypeScript integration.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JSON to Zod', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 2156 }
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
