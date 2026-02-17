import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'url-encoder';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste the text or URL you want to encode/decode',
    'The tool auto-detects whether to encode or decode',
    'Or manually select full or partial encoding',
    'Copy the result to your clipboard',
  ],
  [
    {
      question: 'Is this URL encoder/decoder free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What is the difference between encodeURI and encodeURIComponent?',
      answer: 'encodeURI encodes the full URL but leaves reserved characters (:/?#[]@) intact, while encodeURIComponent encodes everything including those characters for use in query parameters.',
    },
    {
      question: 'Can I encode query strings?',
      answer: 'Yes! The tool is perfect for encoding query parameters, form data, and any text that needs to be URL-safe.',
    },
    {
      question: 'What special characters are handled?',
      answer: 'The tool properly handles spaces, ampersands, equals signs, plus signs, and all other special characters that need encoding in URLs.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All encoding/decoding happens client-side in your browser. Your URLs never leave your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'URL Encoder', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1567 }
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
