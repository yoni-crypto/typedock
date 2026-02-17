import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'validator';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Enter or paste your Zod schema definition',
    'Paste the JSON data you want to validate',
    'View real-time validation results and errors',
    'Get detailed error messages for invalid data',
  ],
  [
    {
      question: 'Is this Zod validator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What Zod features are supported?',
      answer: 'The validator supports all Zod features including primitives, objects, arrays, enums, unions, intersections, and custom validations.',
    },
    {
      question: 'Can I test transformations?',
      answer: 'Yes! The tool supports Zod transformations and refinements, showing you both the validated and transformed output.',
    },
    {
      question: 'How are validation errors displayed?',
      answer: 'Errors are shown with clear paths to the problematic fields and detailed messages explaining what went wrong.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All validation happens client-side in your browser. Your schemas and data never leave your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Zod Validator', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1654 }
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
