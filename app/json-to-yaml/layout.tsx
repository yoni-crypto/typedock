import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'JSON to YAML Converter - Convert JSON to YAML Online',
  description: 'Convert JSON to YAML instantly. Free online converter with proper indentation and formatting. 100% client-side, no sign-up required.',
  path: '/json-to-yaml',
  keywords: [
    'json to yaml',
    'json to yaml converter',
    'convert json to yaml',
    'json yaml converter',
    'json to yaml online',
    'free json to yaml',
    'json yaml transformation',
    'json to yaml format',
    'yaml generator from json',
    'convert json to yaml format',
    'json to yaml beautifier',
    'json to yaml parser',
    'json2yaml',
    'yaml conversion',
  ],
});

const structuredData = toolPageSchemas(
  'JSON to YAML Converter',
  'Convert JSON to YAML instantly. Free online converter with proper indentation and formatting. 100% client-side.',
  `${siteConfig.url}/json-to-yaml`,
  [
    'Instant JSON to YAML conversion',
    'Proper indentation and formatting',
    'Supports nested objects and arrays',
    'Real-time conversion',
    'Copy YAML with one click',
    '100% client-side processing',
  ],
  [
    'Paste your JSON into the editor',
    'View instantly converted YAML on the right',
    'Copy the YAML code to use',
  ],
  [
    {
      question: 'Is this JSON to YAML converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'Does this support nested JSON?',
      answer: 'Yes! The converter handles nested objects and arrays, preserving the full structure of your JSON data in YAML format.',
    },
    {
      question: 'Can I convert YAML back to JSON?',
      answer: 'Yes! TypeDock also has a YAML to JSON converter tool that you can use for bidirectional conversion.',
    },
    {
      question: 'Does it validate JSON before conversion?',
      answer: 'Yes, the tool will show an error message if your JSON is invalid, helping you catch syntax errors.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All conversion happens locally in your browser using JavaScript. Your data is never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JSON to YAML', url: `${siteConfig.url}/json-to-yaml` },
  ],
  { value: 4.8, count: 756 }
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
