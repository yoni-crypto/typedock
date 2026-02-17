import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'json-formatter';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your JSON data into the editor',
    'View formatted, beautified JSON with syntax highlighting',
    'Use error detection to find and fix syntax issues',
    'Minify or sort keys as needed',
    'Copy the formatted JSON to your clipboard',
  ],
  [
    {
      question: 'Is this JSON formatter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Can I validate JSON with this tool?',
      answer: 'Yes! The tool provides real-time error detection and validation to ensure your JSON is properly formatted.',
    },
    {
      question: 'Does this work with large JSON files?',
      answer: 'Absolutely! The tool is optimized to handle large JSON files with thousands of lines efficiently.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All processing happens client-side in your browser. Your JSON data never leaves your device.',
    },
    {
      question: 'What formatting options are available?',
      answer: 'You can beautify (pretty-print) JSON, minify it for smaller size, sort object keys alphabetically, and view it in tree format.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JSON Formatter', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 3421 }
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
