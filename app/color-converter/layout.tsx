import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'color-converter';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Enter a color in any supported format (HEX, RGB, HSL)',
    'View the color instantly converted to all formats',
    'Use the visual color picker for precise selection',
    'Generate color palettes and check contrast ratios',
    'Copy CSS code to your clipboard',
  ],
  [
    {
      question: 'Is this color converter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What color formats are supported?',
      answer: 'The tool supports HEX (#RRGGBB), RGB/RGBA, HSL/HSLA, and can convert between all these formats instantly.',
    },
    {
      question: 'Can I check color accessibility contrast?',
      answer: 'Yes! The tool includes a contrast checker to ensure your colors meet WCAG accessibility standards.',
    },
    {
      question: 'Can I generate color palettes?',
      answer: 'Yes! The tool can generate harmonious color palettes including complementary, analogous, and triadic color schemes.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All processing happens client-side in your browser. Your color selections never leave your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Color Converter', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 1523 }
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
