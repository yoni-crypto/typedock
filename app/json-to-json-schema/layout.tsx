import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'json-to-json-schema';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your JSON data into the editor',
    'Select the JSON Schema draft version (7, 2019-09, or 2020-12)',
    'View the generated JSON Schema',
    'Copy or download the schema definition',
  ],
  [
    {
      question: 'Is this JSON Schema generator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Which JSON Schema drafts are supported?',
      answer: 'The tool supports Draft 7, Draft 2019-09, and Draft 2020-12 specifications.',
    },
    {
      question: 'How are types inferred?',
      answer: 'Types are automatically inferred from your JSON values (string, number, boolean, object, array, null).',
    },
    {
      question: 'Can I customize the generated schema?',
      answer: 'Yes! You can configure options like making fields required, adding descriptions, and setting additional properties behavior.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All generation happens client-side in your browser. Your JSON data never leaves your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JSON to JSON Schema', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1345 }
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
