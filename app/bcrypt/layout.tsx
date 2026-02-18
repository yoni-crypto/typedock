import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Bcrypt Hash Generator - Hash & Verify Passwords Online',
  description: 'Generate bcrypt hashes and verify passwords online. Free bcrypt hash generator with configurable salt rounds. Secure password hashing tool. 100% client-side.',
  path: '/bcrypt',
  keywords: [
    'bcrypt generator',
    'bcrypt hash',
    'password hash generator',
    'bcrypt online',
    'hash password',
    'bcrypt verify',
    'password verification',
    'bcrypt checker',
    'hash generator',
    'secure password hash',
    'bcrypt tool',
    'password bcrypt',
    'bcrypt hash generator',
    'hash and verify',
    'salt rounds',
  ],
});

const structuredData = toolPageSchemas(
  'Bcrypt Hash Generator',
  'Generate bcrypt hashes and verify passwords online. Free bcrypt hash generator with configurable salt rounds.',
  `${siteConfig.url}/bcrypt`,
  [
    'Generate bcrypt hashes',
    'Verify passwords against hashes',
    'Configurable salt rounds (4-14)',
    'Secure password hashing',
    'One-click copy hash',
    '100% client-side processing',
  ],
  [
    'Enter your password in the input field',
    'Choose the number of salt rounds',
    'Click Generate Hash to create a bcrypt hash',
    'Or enter a hash to verify a password',
  ],
  [
    {
      question: 'Is this bcrypt generator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What are salt rounds?',
      answer: 'Salt rounds determine the computational cost of hashing. Higher rounds = more secure but slower. 10 is the default, 12+ is recommended for production.',
    },
    {
      question: 'Is bcrypt secure?',
      answer: 'Yes, bcrypt is one of the most widely-used secure password hashing algorithms. It includes automatic salting and is resistant to rainbow table attacks.',
    },
    {
      question: 'Can I verify a password against a hash?',
      answer: 'Yes! Enter the password and the bcrypt hash, then click Verify Password to check if they match.',
    },
    {
      question: 'Is my password sent to any server?',
      answer: 'Absolutely not! All hashing happens locally in your browser using JavaScript. Your passwords are never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Bcrypt Hash Generator', url: `${siteConfig.url}/bcrypt` },
  ],
  { value: 4.8, count: 1876 }
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
