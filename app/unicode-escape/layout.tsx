import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'unicode-escape';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste or type text with Unicode characters',
    'Select escape mode (\\uXXXX or \\xXX)',
    'Click to escape or unescape',
    'Copy the result to clipboard',
    'Use JavaScript code example for development',
  ],
  [
    {
      question: 'What is Unicode escaping?',
      answer: 'Unicode escaping converts non-ASCII characters into escape sequences like \\uXXXX (for BMP characters) or \\u{XXXXXX} (for extended Unicode), making them safe for use in source code, JSON, or systems that only support ASCII.',
    },
    {
      question: 'When do I need to escape Unicode?',
      answer: 'You need Unicode escaping when: working with legacy systems that don\'t support Unicode, embedding Unicode in JavaScript/JSON source code, creating portable text files, or debugging character encoding issues.',
    },
    {
      question: 'What\'s the difference between \\uXXXX and \\xXX?',
      answer: '\\uXXXX is the standard Unicode escape for characters up to U+FFFF (4 hex digits). \\xXX is a hex escape that works in many programming languages for any byte value (2 hex digits).',
    },
    {
      question: 'Does this tool support emojis?',
      answer: 'Yes! We support all Unicode characters including emojis (😀), mathematical symbols (∑), and characters from all languages. Emojis outside the Basic Multilingual Plane use \\u{XXXXXX} format.',
    },
    {
      question: 'Is this tool free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Unicode Escape', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 1543 }
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
