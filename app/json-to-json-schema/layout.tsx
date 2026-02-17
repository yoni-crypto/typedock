import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'JSON to JSON Schema Converter',
  description: 'Convert JSON to JSON Schema (Draft 7) instantly. Generate JSON Schema for API validation, OpenAPI specs, and backend validation.',
  path: '/json-to-json-schema',
  keywords: ['json to json schema', 'json schema generator', 'openapi schema', 'json schema draft 7', 'api validation'],
});

export default function JsonToJsonSchemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
