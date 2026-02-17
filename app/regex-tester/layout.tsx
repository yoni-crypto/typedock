import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'regex-tester';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Enter your regular expression pattern',
    'Type or paste test text in the input area',
    'View live match highlighting and groups',
    'Adjust flags (g, i, m, s, u, y) as needed',
    'Test replacements and capture groups',
  ],
  [
    {
      question: 'Is this regex tester free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Which regex flavors are supported?',
      answer: 'This tester uses JavaScript/ECMAScript regex engine, which works in Node.js and all modern browsers.',
    },
    {
      question: 'Can I test regex replacements?',
      answer: 'Yes! The tool includes a replace mode where you can test find-and-replace operations with capture groups.',
    },
    {
      question: 'What regex flags are supported?',
      answer: 'All JavaScript flags are supported: g (global), i (ignore case), m (multiline), s (dotall), u (unicode), and y (sticky).',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All processing happens client-side in your browser. Your patterns and test text never leave your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'RegEx Tester', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1893 }
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
