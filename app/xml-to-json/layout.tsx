import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'xml-to-json';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste XML data or upload an XML file',
    'Configure attribute handling and namespace options',
    'View the converted JSON output',
    'Copy or download the result',
  ],
  [
    {
      question: 'Is this XML to JSON converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'How are XML attributes handled?',
      answer: 'XML attributes can be converted to JSON properties with configurable prefixes (e.g., @attribute) or merged directly.',
    },
    {
      question: 'Does it support bidirectional conversion?',
      answer: 'Yes! You can convert XML to JSON and also convert JSON back to XML format.',
    },
    {
      question: 'Are XML namespaces preserved?',
      answer: 'Yes! Namespace information is preserved and can be included in the JSON output with configurable handling options.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All conversion happens client-side in your browser. Your XML data never leaves your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'XML to JSON', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1456 }
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
