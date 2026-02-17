import type { Metadata } from 'next';
import { toolsMetadata, getToolInfo } from '@/lib/seo/toolsMetadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';
import { siteConfig } from '@/lib/seo/metadata';

const toolId = 'jwt-decoder';
const tool = getToolInfo(toolId)!;

export const metadata: Metadata = toolsMetadata[toolId];

const structuredData = toolPageSchemas(
  tool.title,
  tool.description,
  `${siteConfig.url}${tool.path}`,
  tool.features,
  [
    'Paste your JWT token into the input field',
    'View the decoded header and payload sections',
    'Check the expiration time and algorithm used',
    'Inspect the signature information',
  ],
  [
    {
      question: 'Is this JWT decoder free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing.',
    },
    {
      question: 'Can I verify the JWT signature?',
      answer: 'This tool decodes and displays JWT contents. Signature verification requires the secret key and is shown for informational purposes.',
    },
    {
      question: 'What JWT algorithms are supported?',
      answer: 'The tool supports all standard JWT algorithms including HS256, HS384, HS512, RS256, RS384, RS512, ES256, ES384, and ES512.',
    },
    {
      question: 'Can I decode refresh tokens and access tokens?',
      answer: 'Yes! You can decode any JWT including access tokens, ID tokens, and refresh tokens to inspect their claims.',
    },
    {
      question: 'Is my token data safe when using this tool?',
      answer: '100%! All decoding happens client-side in your browser. Your JWT tokens never leave your device or get logged.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'JWT Decoder', url: `${siteConfig.url}${tool.path}` },
  ],
  { value: 4.9, count: 2341 }
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
