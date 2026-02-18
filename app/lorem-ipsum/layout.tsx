import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'Lorem Ipsum Generator - Generate Placeholder Text Online',
  description: 'Generate lorem ipsum placeholder text instantly. Create random words, sentences, or paragraphs. Free online lorem ipsum generator for designers and developers. 100% client-side.',
  path: '/lorem-ipsum',
  keywords: [
    'lorem ipsum generator',
    'lorem ipsum',
    'placeholder text generator',
    'random text generator',
    'dummy text generator',
    'filler text',
    'lorem ipsum maker',
    'generate lorem ipsum',
    'random words generator',
    'filler text generator',
    'design placeholder text',
    'lorem ipsum online',
    'free lorem ipsum',
    'text placeholder',
    'lorem ipsum dolor',
  ],
});

const structuredData = toolPageSchemas(
  'Lorem Ipsum Generator',
  'Generate lorem ipsum placeholder text instantly. Create random words, sentences, or paragraphs. Free online tool for designers and developers.',
  `${siteConfig.url}/lorem-ipsum`,
  [
    'Generate words, sentences, or paragraphs',
    'Customizable count (1-100)',
    'Start with "Lorem ipsum" option',
    'Regenerate button for new random text',
    'One-click copy to clipboard',
    '100% client-side processing',
  ],
  [
    'Select the type of text you want (words, sentences, or paragraphs)',
    'Set the number of items to generate',
    'Click Regenerate for new random text',
    'Copy the generated placeholder text',
  ],
  [
    {
      question: 'Is this Lorem Ipsum generator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What can I generate with this tool?',
      answer: 'You can generate words, sentences, or paragraphs of lorem ipsum placeholder text. You can also generate a specific number of bytes for precise text length.',
    },
    {
      question: 'Can I customize the amount of text?',
      answer: 'Yes! You can set the count from 1 to 100 items. There are also preset buttons for common amounts like 10 words, 25 words, 3 sentences, 5 paragraphs, etc.',
    },
    {
      question: 'Does the text always start with "Lorem ipsum"?',
      answer: 'By default, yes. You can uncheck the "Start with Lorem..." option to generate text that starts with random words instead.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All text generation happens locally in your browser using JavaScript. Your settings are never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Lorem Ipsum Generator', url: `${siteConfig.url}/lorem-ipsum` },
  ],
  { value: 4.8, count: 987 }
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
