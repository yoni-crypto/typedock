import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'hash-generator';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Enter text or upload a file to hash',
    'Select the hash algorithm (MD5, SHA-1, SHA-256, etc.)',
    'Optionally add a secret key for HMAC',
    'Copy the generated hash to clipboard',
  ],
  [
    {
      question: 'Is this hash generator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Which hash algorithms are supported?',
      answer: 'The tool supports MD5, SHA-1, SHA-256, SHA-384, SHA-512, SHA-3, and BLAKE2b algorithms.',
    },
    {
      question: 'Can I hash files?',
      answer: 'Yes! You can upload files of any size and generate their hash values for integrity verification.',
    },
    {
      question: 'What is HMAC and how do I use it?',
      answer: 'HMAC (Hash-based Message Authentication Code) adds a secret key to the hash for additional security. Enter your key to generate an HMAC hash.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All hashing happens client-side in your browser. Your data and files never leave your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Hash Generator', url: `${siteConfig.url}${tool.path}` },
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
