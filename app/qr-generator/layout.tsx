import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'qr-generator';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Enter text, URL, WiFi credentials, or contact info',
    'Customize colors and error correction level',
    'Preview the QR code instantly',
    'Download in PNG or SVG format',
  ],
  [
    {
      question: 'Is this QR code generator free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What types of data can I encode?',
      answer: 'You can encode URLs, plain text, WiFi network credentials (SSID, password), contact cards (vCard), and email addresses.',
    },
    {
      question: 'Can I customize the QR code colors?',
      answer: 'Yes! You can customize both the foreground and background colors to match your branding.',
    },
    {
      question: 'What formats can I download?',
      answer: 'You can download QR codes as PNG (raster) for web use or SVG (vector) for print materials.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All processing happens client-side in your browser. Your data never leaves your device.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'QR Generator', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 4215 }
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
