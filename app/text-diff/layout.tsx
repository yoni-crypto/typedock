import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Text Diff - Compare Two Texts Online',
  description: 'Compare two texts and see the differences. Free online text diff tool with line-by-line comparison. 100% client-side, no sign-up required.',
  path: '/text-diff',
  keywords: [
    'text diff',
    'text compare',
    'text difference',
    'compare texts',
    'text comparison tool',
    'diff checker',
    'text difference finder',
    'online text diff',
    'text matcher',
    'string comparison',
    'text compare tool',
    'diff tool online',
    'text differences',
    'compare two texts',
    'line by line diff',
  ],
});

const structuredData = toolPageSchemas(
  'Text Diff',
  'Compare two texts and see the differences. Free online text diff tool with line-by-line comparison.',
  `${siteConfig.url}/text-diff`,
  [
    'Compare any two texts',
    'Line-by-line diff highlighting',
    'Shows added and removed lines',
    'Real-time comparison',
    'Side-by-side view',
    '100% client-side processing',
  ],
  [
    'Paste your original text on the left',
    'Paste the modified text on the right',
    'View the differences highlighted',
  ],
  [
    {
      question: 'Is this text diff tool free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What is the difference between this and JSON Diff?',
      answer: 'JSON Diff only works with JSON data and shows structured changes. Text Diff works with any plain text, making it perfect for comparing documents, code, or any text content.',
    },
    {
      question: 'Does it support large texts?',
      answer: 'Yes! The tool uses Monaco Editor which handles large texts efficiently. However, for very large files you may experience some slowdown.',
    },
    {
      question: 'Can I see the number of changes?',
      answer: 'Yes! The tool shows the count of added (+) and removed (-) lines above the right panel.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All comparisons happen locally in your browser using JavaScript. Your texts are never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Text Diff', url: `${siteConfig.url}/text-diff` },
  ],
  { value: 4.7, count: 543 }
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
