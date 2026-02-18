import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'json-minify';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste or type your JSON',
    'Click Minify JSON',
    'See size comparison and savings',
    'Copy minified output',
    'Use JavaScript assignment if needed',
  ],
  [
    {
      question: 'What does JSON minification do?',
      answer: 'JSON minification removes all unnecessary whitespace, newlines, and indentation from JSON data while preserving the data structure. This reduces file size and improves transfer speed.',
    },
    {
      question: 'How much size can I save?',
      answer: 'Typical savings range from 30-50% depending on how much whitespace was in the original JSON. Well-formatted JSON with lots of indentation can see even higher savings.',
    },
    {
      question: 'Is minified JSON still valid?',
      answer: 'Yes! Minified JSON is 100% valid JSON. JSON.parse() and all JSON parsers work exactly the same with minified data.',
    },
    {
      question: 'Should I minify JSON for APIs?',
      answer: 'Yes! Minifying JSON responses from APIs reduces bandwidth usage and improves response times, especially for mobile users and large datasets.',
    },
    {
      question: 'Does this tool validate JSON?',
      answer: 'Yes! Before minifying, we validate the JSON structure. If there are syntax errors, you\'ll see an error message instead of minified output.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JSON Minify', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 3124 }
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
