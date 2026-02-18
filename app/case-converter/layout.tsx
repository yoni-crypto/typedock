import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Case Converter - Convert Between camelCase, snake_case, kebab-case, PascalCase',
  description: 'Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, title case, and more. Free online case converter with 13 case formats. 100% client-side.',
  path: '/case-converter',
  keywords: [
    'case converter',
    'camelcase converter',
    'snake case to camel case',
    'kebab case converter',
    'pascal case',
    'constant case',
    'dot case',
    'title case converter',
    'sentence case',
    'header case',
    'path case',
    'text case converter',
    'string case converter',
    'convert case online',
    'case conversion tool',
  ],
});

const structuredData = toolPageSchemas(
  'Case Converter',
  'Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, title case, and more. Free online tool with 13 case formats.',
  `${siteConfig.url}/case-converter`,
  [
    'Convert to 13 different case formats',
    'camelCase, PascalCase, snake_case, kebab-case',
    'CONSTANT_CASE, dot.case, path/case',
    'Title case, Sentence case, Header case',
    'Upper case, Lower case, Swap case',
    '100% client-side processing',
  ],
  [
    'Enter your text in the input field',
    'View instant conversions to all 13 case formats',
    'Copy any result with one click',
    'Use quick example buttons to test',
  ],
  [
    {
      question: 'Is this case converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What case formats are supported?',
      answer: 'We support 13 case formats: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, title case, sentence case, header case, path case, UPPERCASE, lowercase, and swap case.',
    },
    {
      question: 'What is camelCase used for?',
      answer: 'camelCase is commonly used in JavaScript, Java, and C# for variable names and function names. It starts with a lowercase letter and each new word is capitalized.',
    },
    {
      question: 'What is snake_case used for?',
      answer: 'snake_case is commonly used in Python, Ruby, and SQL for variable names and function names. Words are separated by underscores and all letters are lowercase.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All conversions happen locally in your browser using JavaScript. Your text is never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Case Converter', url: `${siteConfig.url}/case-converter` },
  ],
  { value: 4.9, count: 1456 }
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
