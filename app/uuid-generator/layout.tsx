import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'uuid-generator';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Select the UUID version you need (v1, v4, v5, v7)',
    'Choose how many UUIDs to generate',
    'Click generate to create unique identifiers',
    'Copy individual UUIDs or all at once',
  ],
  [
    {
      question: 'Is this UUID generator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What is the difference between UUID versions?',
      answer: 'v1 is time-based, v4 is random, v5 is name-based with SHA-1 hash, and v7 is the new time-ordered UUID standard.',
    },
    {
      question: 'Can I generate multiple UUIDs at once?',
      answer: 'Yes! You can generate up to thousands of UUIDs in a single batch with the bulk generation feature.',
    },
    {
      question: 'Are the UUIDs cryptographically secure?',
      answer: 'Yes! UUID v4 and v7 use cryptographically secure random number generation when available in your browser.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All generation happens client-side in your browser. No UUIDs are logged or sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'UUID Generator', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 3156 }
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
