import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Number Base Converter - Binary, Octal, Decimal, Hex, Base32, Base58, Base64',
  description: 'Convert numbers between Binary, Octal, Decimal, Hexadecimal, Base32, Base58, and Base64 instantly. Free online base converter with 7 bases supported. 100% client-side.',
  path: '/base-converter',
  keywords: [
    'number base converter',
    'binary converter',
    'hex to decimal',
    'decimal to binary',
    'octal converter',
    'hexadecimal converter',
    'base32 converter',
    'base58 converter',
    'base64 converter',
    'number system converter',
    'base conversion calculator',
    'decimal to hex',
    'binary to decimal',
    'hex to binary converter',
    'online base converter',
  ],
});

const structuredData = toolPageSchemas(
  'Number Base Converter',
  'Convert numbers between Binary, Octal, Decimal, Hexadecimal, Base32, Base58, and Base64 instantly. Free online tool with 7 bases supported.',
  `${siteConfig.url}/base-converter`,
  [
    'Convert to 7 different bases',
    'Binary, Octal, Decimal, Hex support',
    'Base32, Base58, Base64 encoding',
    'Input validation',
    'Quick reference guide',
    '100% client-side processing',
  ],
  [
    'Select the base of your input number',
    'Enter your number in the input field',
    'View instant conversions to all 7 bases',
    'Copy any result with one click',
  ],
  [
    {
      question: 'Is this base converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What bases are supported?',
      answer: 'We support 7 bases: Binary (Base 2), Octal (Base 8), Decimal (Base 10), Hexadecimal (Base 16), Base32, Base58, and Base64.',
    },
    {
      question: 'What is Base58 used for?',
      answer: 'Base58 is commonly used in cryptocurrency addresses (like Bitcoin) to avoid confusing characters like 0, O, I, and l.',
    },
    {
      question: 'What is Base32 used for?',
      answer: 'Base32 is often used in DNS entries, contact information (vCard), and systems that require case-insensitive encoding.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All conversions happen locally in your browser using JavaScript. Your data is never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Base Converter', url: `${siteConfig.url}/base-converter` },
  ],
  { value: 4.8, count: 892 }
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
