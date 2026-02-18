import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'html-entities';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste or type your text with special characters',
    'Select Encode or Decode mode',
    'Click the Convert button',
    'Copy the result to clipboard',
    'For decode mode, see rendered HTML preview',
  ],
  [
    {
      question: 'What are HTML entities?',
      answer: 'HTML entities are special codes used to represent characters that have special meaning in HTML, like < (less than), > (greater than), & (ampersand), and special characters like © (copyright), € (euro), etc.',
    },
    {
      question: 'When should I encode HTML entities?',
      answer: 'Encode HTML entities when displaying user-generated content on web pages to prevent XSS attacks, or when you need to display HTML code as text rather than render it.',
    },
    {
      question: 'Does this tool support all Unicode characters?',
      answer: 'Yes! We support all standard HTML entities including named entities (&lt;, &gt;, &amp;), decimal entities (&#169;), and hexadecimal entities (&#xA9;) for all Unicode characters.',
    },
    {
      question: 'Is this tool free to use?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Is my data safe?',
      answer: '100%! All encoding/decoding happens client-side in your browser. Your data never leaves your device or gets sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'HTML Entities', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1892 }
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
