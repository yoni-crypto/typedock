import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'Zod Validator Playground',
  description: 'Validate JSON data against Zod schemas in real-time. Test your Zod validation logic with instant feedback and detailed error messages.',
  path: '/validator',
  keywords: ['zod validator', 'json validation', 'zod playground', 'schema validation', 'runtime validation'],
});

export default function ValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
