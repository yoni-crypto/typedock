import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'JSON Schema to TypeScript Converter',
  description: 'Convert JSON Schema to TypeScript interfaces. Generate TypeScript types from JSON Schema for API contracts and validation.',
  path: '/json-schema-to-typescript',
  keywords: ['json schema to typescript', 'json schema converter', 'openapi to typescript', 'schema to types'],
});

export default function JsonSchemaToTypescriptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
