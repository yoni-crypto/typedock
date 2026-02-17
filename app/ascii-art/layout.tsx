import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'ascii-art';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Type the text you want to convert to ASCII art',
    'Select a font style from the available options',
    'Preview the ASCII art in real-time',
    'Copy the ASCII art to your clipboard',
  ],
  [
    {
      question: 'Is this ASCII art generator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What font styles are available?',
      answer: 'The tool includes various font styles like banner, block, standard, slant, and decorative fonts for different aesthetics.',
    },
    {
      question: 'Can I use special characters?',
      answer: 'Yes! The tool supports a wide range of characters including letters, numbers, and many special characters.',
    },
    {
      question: 'Where can I use ASCII art?',
      answer: 'ASCII art is perfect for terminal headers, code comments, README files, creative projects, and documentation.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All processing happens client-side in your browser. Your text never leaves your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'ASCII Art Generator', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1234 }
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
