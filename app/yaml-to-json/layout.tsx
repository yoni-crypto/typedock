import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'yaml-to-json';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste YAML content or upload a YAML file',
    'Configure anchor/alias resolution options',
    'View the converted JSON output',
    'Copy or download the result',
  ],
  [
    {
      question: 'Is this YAML to JSON converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Does it support multi-document YAML files?',
      answer: 'Yes! The tool can handle YAML files with multiple documents separated by --- and convert them to JSON arrays.',
    },
    {
      question: 'How are YAML anchors and aliases handled?',
      answer: 'Anchors and aliases are resolved automatically, creating proper JSON structures without references.',
    },
    {
      question: 'Can I convert JSON back to YAML?',
      answer: 'Yes! The tool supports bidirectional conversion, so you can convert JSON to YAML format as well.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All conversion happens client-side in your browser. Your YAML data never leaves your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'YAML to JSON', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1678 }
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
