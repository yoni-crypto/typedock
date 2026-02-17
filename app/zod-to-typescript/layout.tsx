import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'zod-to-typescript';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your Zod schema definitions',
    'Select TypeScript extraction options',
    'View the generated TypeScript types',
    'Copy the TypeScript code to your clipboard',
  ],
  [
    {
      question: 'Is this Zod to TypeScript converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What types can be extracted from Zod?',
      answer: 'The tool extracts all Zod types including objects, arrays, primitives, enums, unions, intersections, and inferred types.',
    },
    {
      question: 'Does it handle complex Zod schemas?',
      answer: 'Yes! Complex schemas with .transform(), .refine(), .pipe(), and other Zod methods are properly analyzed and converted.',
    },
    {
      question: 'Can I generate type aliases or interfaces?',
      answer: 'Yes! You can choose to generate either TypeScript type aliases or interfaces based on your coding style preference.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All extraction happens client-side in your browser. Your Zod schemas never leave your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Zod to TypeScript', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1098 }
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
