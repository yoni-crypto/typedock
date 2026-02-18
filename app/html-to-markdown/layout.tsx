import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'HTML to Markdown Converter - Convert HTML to MD with GitHub-Flavored Markdown',
  description: 'Convert HTML to Markdown instantly with GitHub-Flavored Markdown support. Preserves tables, code blocks, lists, and formatting. 100% free, client-side, no sign-up required.',
  path: '/html-to-markdown',
  keywords: [
    'html to markdown',
    'html to md',
    'convert html to markdown',
    'html converter',
    'markdown generator',
    'html to gfm',
    'html to github markdown',
    'reverse markdown converter',
    'html parser markdown',
    'html to markdown online',
    'free html to markdown',
    'bidirectional conversion',
  ],
});

const structuredData = toolPageSchemas(
  'HTML to Markdown Converter',
  'Convert HTML to Markdown instantly with GitHub-Flavored Markdown support. Preserves tables, code blocks, lists, and formatting.',
  `${siteConfig.url}/html-to-markdown`,
  [
    'GitHub-Flavored Markdown (GFM) support',
    'Table and task list conversion',
    'Code block preservation',
    'Live preview mode',
    '100% client-side processing',
    'Copy Markdown with one click',
  ],
  [
    'Paste your HTML code into the editor',
    'View the Markdown output on the right panel',
    'Switch to Live Preview to see rendered Markdown',
    'Copy the Markdown code to use in your project',
  ],
  [
    {
      question: 'Is this HTML to Markdown converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What HTML elements are supported?',
      answer: 'We support all standard HTML elements including headings, paragraphs, lists, tables, code blocks, blockquotes, links, images, and more using GitHub-Flavored Markdown.',
    },
    {
      question: 'Can I convert tables from HTML?',
      answer: 'Yes! Tables are automatically converted to Markdown table syntax, preserving headers and cell content.',
    },
    {
      question: 'Does it preserve code block formatting?',
      answer: 'Absolutely! Code blocks with language specifications are preserved and converted to fenced Markdown code blocks.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All conversion happens locally in your browser using JavaScript. Your HTML content is never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'HTML to Markdown', url: `${siteConfig.url}/html-to-markdown` },
  ],
  { value: 4.8, count: 1247 }
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
