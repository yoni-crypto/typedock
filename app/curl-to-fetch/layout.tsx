import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'curl-to-fetch';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your cURL command',
    'Select output format (Fetch, Axios, Node.js)',
    'Click Convert',
    'Copy the generated code',
  ],
  [
    {
      question: 'What cURL options are supported?',
      answer: 'We support the most common options: -X (method), -H (headers), -d/--data (body), and URL extraction. Complex authentication methods and file uploads may need manual adjustment.',
    },
    {
      question: 'Which formats can I convert to?',
      answer: 'Currently we support: Fetch API (modern browsers), Axios (popular HTTP library), and Node.js native HTTPS module.',
    },
    {
      question: 'Does it handle multi-line cURL commands?',
      answer: 'Yes! Multi-line cURL commands with backslash continuation are automatically handled and parsed correctly.',
    },
    {
      question: 'Is the generated code production-ready?',
      answer: 'The generated code provides a solid foundation. You may need to add error handling, timeouts, and other production considerations based on your specific needs.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'cURL to Fetch', url: `${siteConfig.url}${tool.path}` },
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
