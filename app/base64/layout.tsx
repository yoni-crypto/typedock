import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'base64';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Enter text or upload a file to encode',
    'View the Base64 encoded result instantly',
    'Or paste Base64 text to decode back to original',
    'Copy results to clipboard with one click',
  ],
  [
    {
      question: 'Is this Base64 encoder/decoder free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Can I encode files to Base64?',
      answer: 'Yes! You can upload files (images, documents, etc.) and convert them to Base64 strings for embedding or transmission.',
    },
    {
      question: 'What is URL-safe Base64?',
      answer: 'URL-safe Base64 replaces + with - and / with _ and removes padding (=), making it safe for use in URLs and filenames.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All encoding and decoding happens client-side in your browser. Your data never leaves your device.',
    },
    {
      question: 'What can I use Base64 for?',
      answer: 'Base64 is commonly used for encoding binary data in text formats, embedding images in HTML/CSS, API authentication headers, and data transmission.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Base64 Encoder', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 2678 }
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
