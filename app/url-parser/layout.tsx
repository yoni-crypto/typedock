import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'URL Parser - Parse & Build URLs Online',
  description: 'Parse URLs into components or build URLs from parts. Free online URL parser and builder. Extract protocol, hostname, port, path, query, hash. 100% client-side.',
  path: '/url-parser',
  keywords: [
    'url parser',
    'parse url',
    'url builder',
    'construct url',
    'url components',
    'url parts',
    'extract url parts',
    'parse hostname',
    'parse query string',
    'url encoder',
    'url decoder',
    'url tool',
    'url parser online',
    'build url from parts',
    'url structure',
  ],
});

const structuredData = toolPageSchemas(
  'URL Parser',
  'Parse URLs into components or build URLs from parts. Free online URL parser and builder.',
  `${siteConfig.url}/url-parser`,
  [
    'Parse URL into components',
    'Build URL from parts',
    'Extract protocol, hostname, port',
    'Parse path, query, hash',
    'Username and password support',
    'One-click copy',
    '100% client-side processing',
  ],
  [
    'Enter a URL to parse its components',
    'View protocol, hostname, port, path, query, and hash',
    'Modify individual components to build a new URL',
    'Copy the built URL',
  ],
  [
    {
      question: 'Is this URL parser free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What URL parts can I parse?',
      answer: 'You can parse all URL components: protocol (https:), hostname (example.com), port (8080), pathname (/path), search query (?param=value), hash (#section), username, and password.',
    },
    {
      question: 'Can I build a URL from parts?',
      answer: 'Yes! Use the right panel to enter individual URL components and see the built URL update in real-time.',
    },
    {
      question: 'Does this validate URLs?',
      answer: 'Yes, if you enter an invalid URL, the parser will show empty fields. Valid URLs will display all their components.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All parsing happens locally in your browser using JavaScript. Your URLs are never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'URL Parser', url: `${siteConfig.url}/url-parser` },
  ],
  { value: 4.7, count: 412 }
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
