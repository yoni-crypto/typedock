import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'user-agent-parser';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [],
  [],
  [
    { name: 'Home', url: siteConfig.url },
    { name: tool.title.split(' - ')[0], url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.8, count: 1500 }
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
