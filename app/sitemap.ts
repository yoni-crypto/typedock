import { MetadataRoute } from 'next';
import { toolsData } from '@/lib/seo/toolsMetadata';
import { siteConfig } from '@/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  
  const tools = Object.entries(toolsData).map(([id, tool]) => ({
    path: tool.path,
    priority: tool.priority,
    changeFrequency: tool.changeFrequency,
  }));
  
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...tools.map(tool => ({
      url: `${siteConfig.url}${tool.path}`,
      lastModified,
      changeFrequency: tool.changeFrequency as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
      priority: tool.priority,
    })),
  ];
}
