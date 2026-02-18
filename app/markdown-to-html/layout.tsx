import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Markdown to HTML Converter - Convert MD to HTML with Live Preview',
  description: 'Convert Markdown to HTML instantly with GitHub-Flavored Markdown support, syntax highlighting, tables, task lists, and live preview. 100% free, client-side, no sign-up required.',
  path: '/markdown-to-html',
  keywords: [
    'markdown to html',
    'markdown converter',
    'md to html',
    'convert markdown',
    'markdown parser',
    'gfm converter',
    'github markdown',
    'markdown preview',
    'markdown editor',
    'markdown syntax',
    'markdown table',
    'markdown code highlighting',
    'live markdown preview',
    'markdown to html online',
    'free markdown converter',
  ],
});

const structuredData = toolPageSchemas(
  'Markdown to HTML Converter',
  'Convert Markdown to HTML instantly with GitHub-Flavored Markdown support, syntax highlighting, tables, task lists, and live preview.',
  `${siteConfig.url}/markdown-to-html`,
  [
    'GitHub-Flavored Markdown (GFM) support',
    'Syntax highlighting for 190+ languages',
    'Live preview mode',
    'Tables, task lists, and strikethrough',
    '100% client-side processing',
    'Copy HTML with one click',
  ],
  [
    'Paste your Markdown text into the editor',
    'View the HTML code on the right panel',
    'Switch to Live Preview to see rendered output',
    'Copy the HTML code to use in your project',
  ],
  [
    {
      question: 'Is this Markdown to HTML converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What Markdown features are supported?',
      answer: 'We support GitHub-Flavored Markdown (GFM) including tables, task lists, strikethrough, autolinks, and fenced code blocks with syntax highlighting for 190+ programming languages.',
    },
    {
      question: 'Can I see a live preview of my Markdown?',
      answer: 'Absolutely! Click the "Live Preview" button to see your Markdown rendered in real-time with beautiful styling, code highlighting, and proper formatting.',
    },
    {
      question: 'Does this support code syntax highlighting?',
      answer: 'Yes! Code blocks are automatically syntax highlighted for 190+ languages including JavaScript, Python, TypeScript, Rust, Go, and many more.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All conversion happens locally in your browser using JavaScript. Your Markdown content is never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Markdown to HTML', url: `${siteConfig.url}/markdown-to-html` },
  ],
  { value: 4.9, count: 1823 }
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
