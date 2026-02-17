import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'image-compressor';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Upload one or more images (JPG, PNG, WebP)',
    'Adjust the quality slider to your desired compression level',
    'Preview the compressed image and file size reduction',
    'Download the optimized images',
  ],
  [
    {
      question: 'Is this image compressor free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'What image formats are supported?',
      answer: 'The tool supports JPEG/JPG, PNG, and WebP formats. You can also convert between these formats during compression.',
    },
    {
      question: 'Can I compress multiple images at once?',
      answer: 'Yes! The batch processing feature lets you compress multiple images simultaneously with the same quality settings.',
    },
    {
      question: 'Is EXIF data preserved?',
      answer: 'Yes! You can choose to preserve or strip EXIF metadata (camera info, GPS, etc.) during compression.',
    },
    {
      question: 'Is my data safe when using this tool?',
      answer: '100%! All compression happens client-side in your browser. Your images never leave your device or get uploaded to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'Image Compressor', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 2876 }
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
