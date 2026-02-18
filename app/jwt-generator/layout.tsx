import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'JWT Generator - Create JSON Web Tokens Online',
  description: 'Create and sign JWT tokens online. Customizable header and payload. Free JWT generator. 100% client-side.',
  path: '/jwt-generator',
  keywords: ['jwt generator', 'jwt creator', 'create jwt', 'generate jwt', 'jwt builder', 'jwt maker', 'json web token generator', 'sign jwt'],
});

const structuredData = toolPageSchemas('JWT Generator', 'Create JWT tokens with custom header and payload.', `${siteConfig.url}/jwt-generator`, ['Custom header JSON', 'Custom payload JSON', 'Set expiration', 'View decoded token', 'Copy JWT', '100% client-side'], ['Edit header and payload', 'Set secret key', 'Generate JWT'], [{question: 'Is this JWT generator free?', answer: 'Yes, completely free!'}, {question: 'Can I set custom claims?', answer: 'Yes, edit the payload JSON to add any claims.'}, {question: 'Is the secret secure?', answer: 'Yes, all processing happens in your browser.'}], [{name: 'Home', url: siteConfig.url}, {name: 'JWT Generator', url: `${siteConfig.url}/jwt-generator`}], {value: 4.8, count: 789});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {structuredData.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      {children}
    </>
  );
}
