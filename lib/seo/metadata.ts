import { Metadata } from 'next';

const siteUrl = 'https://typedock.vercel.app';
const siteName = 'TypeDock';
const siteDescription = 'Fast, free JSON to TypeScript and Zod converter. Generate TypeScript interfaces and Zod schemas instantly in your browser. No login, no API calls, 100% client-side.';

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TypeDock - JSON to TypeScript & Zod Converter',
    template: '%s | TypeDock',
  },
  description: siteDescription,
  keywords: [
    'json to typescript',
    'json to zod',
    'typescript generator',
    'zod schema generator',
    'json converter',
    'typescript interface generator',
    'json to ts',
    'json to type',
    'typescript types from json',
    'zod validation',
    'runtime validation',
    'type inference',
    'json parser',
    'typescript tool',
    'developer tools',
    'free json converter',
    'online typescript generator',
  ],
  authors: [{ name: 'TypeDock' }],
  creator: 'TypeDock',
  publisher: 'TypeDock',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: 'TypeDock - JSON to TypeScript & Zod Converter',
    description: siteDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TypeDock - JSON to TypeScript & Zod Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypeDock - JSON to TypeScript & Zod Converter',
    description: siteDescription,
    images: ['/og-image.png'],
    creator: '@typedock',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteUrl}${path}`;
  
  return {
    title,
    description,
    keywords: [...baseMetadata.keywords as string[], ...keywords],
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}
