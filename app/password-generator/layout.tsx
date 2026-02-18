import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Password Generator - Generate Secure Random Passwords Online',
  description: 'Generate secure random passwords instantly. Customizable length, character types, and strength indicator. Free online password generator with cryptographically secure random values. 100% client-side.',
  path: '/password-generator',
  keywords: [
    'password generator',
    'secure password generator',
    'random password generator',
    'password maker',
    'create password',
    'strong password generator',
    'password generator online',
    'random password',
    'secure password',
    'password strength',
    'generate password',
    'free password generator',
    'password creator',
    'complex password',
    'cryptographically secure password',
  ],
});

const structuredData = toolPageSchemas(
  'Password Generator',
  'Generate secure random passwords instantly. Customizable length, character types, and strength indicator. Free online tool.',
  `${siteConfig.url}/password-generator`,
  [
    'Cryptographically secure random generation',
    'Customizable length (4-64 characters)',
    'Toggle uppercase, lowercase, numbers, symbols',
    'Exclude ambiguous characters option',
    'Real-time password strength indicator',
    'One-click copy to clipboard',
    '100% client-side processing',
  ],
  [
    'Set the password length using the slider',
    'Choose which character types to include',
    'Click Regenerate to create a new password',
    'Copy the password to use',
  ],
  [
    {
      question: 'Is this password generator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'How secure are the generated passwords?',
      answer: 'We use cryptographically secure random values from the Web Crypto API (crypto.getRandomValues) for maximum security. The passwords are generated locally in your browser.',
    },
    {
      question: 'Can I customize the password?',
      answer: 'Yes! You can set the length from 4 to 64 characters, and toggle uppercase letters, lowercase letters, numbers, and symbols.',
    },
    {
      question: 'What does "Exclude ambiguous" do?',
      answer: 'When enabled, it removes characters that can be easily confused like 0 (zero), O (capital o), 1 (one), l (lowercase L), and I (capital i) to prevent copy-paste errors.',
    },
    {
      question: 'Is my password sent to any server?',
      answer: 'Absolutely not! All password generation happens locally in your browser using JavaScript. Your passwords are never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Password Generator', url: `${siteConfig.url}/password-generator` },
  ],
  { value: 4.9, count: 3421 }
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
