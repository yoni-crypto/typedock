import { Metadata, Viewport } from 'next';

export const siteConfig = {
  url: 'https://typedock.vercel.app',
  name: 'TypeDock',
  shortName: 'TypeDock',
  description: 'TypeDock offers 23 free, powerful developer tools including JSON to TypeScript converter, Zod schema generator, regex tester, color converter, QR code generator, and more. 100% client-side processing, no sign-up required, privacy-focused.',
  tagline: 'Free Developer Tools Suite',
  author: 'TypeDock',
  twitter: '@typedock',
  github: 'https://github.com/yoni-crypto/typedock',
  ogImage: '/og-image.png',
  locale: 'en_US',
  language: 'en',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const baseKeywords = [
  // Primary keywords
  'developer tools',
  'free online tools',
  'developer utilities',
  'programming tools',
  'web development tools',
  // JSON tools
  'json to typescript',
  'json converter',
  'json formatter',
  'json validator',
  'typescript generator',
  'typescript interface',
  // Zod tools
  'zod schema generator',
  'zod validation',
  'runtime validation',
  'typescript validation',
  // Other popular tools
  'regex tester',
  'regular expression',
  'base64 encoder',
  'base64 decoder',
  'color converter',
  'hex to rgb',
  'qr code generator',
  'uuid generator',
  'guid generator',
  'hash generator',
  'md5 hash',
  'sha256 hash',
  'jwt decoder',
  'json web token',
  'csv to json',
  'xml to json',
  'yaml to json',
  'image compressor',
  'ascii art generator',
  'url encoder',
  'url decoder',
  'timestamp converter',
  'unix timestamp',
  'json diff',
  'json compare',
  'zod validator',
  'json schema',
  // Long-tail keywords
  'best json to typescript converter',
  'online json formatter free',
  'privacy focused developer tools',
  'client side developer tools',
  'no signup developer tools',
  'instant json converter',
  'typescript type generator',
  'zod schema from json',
  'free qr code generator online',
  'bulk uuid generator',
  'online regex tester javascript',
  'color code converter tool',
  'base64 encode decode online',
  'jwt token decoder online',
  'csv to json converter free',
  'yaml to json online',
  'xml to json converter',
  'compress images online free',
  'ascii art generator text',
  'url encode decode tool',
  'epoch timestamp converter',
  'compare json files online',
  'zod schema validator online',
  'json schema generator online',
  'json schema to typescript',
  'convert typescript to zod',
  'extract typescript from zod',
];

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - 23 Free Developer Tools | JSON, TypeScript, Zod, Regex & More`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: baseKeywords,
  authors: [{ 
    name: siteConfig.author,
    url: siteConfig.url 
  }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  generator: 'Next.js',
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
    robots: {
    index: true,
    follow: true,
    nocache: false,
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
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - 23 Free Developer Tools`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - 23 Free Developer Tools for JSON, TypeScript, Regex & More`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - 23 Free Developer Tools`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
    site: siteConfig.twitter,
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en': siteConfig.url,
      'en-US': siteConfig.url,
    },
  },
  verification: {
    google: 'google32b4b569e6dea431',
  },
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#0a0a0a',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/manifest.json',
  category: 'technology',
  classification: 'Developer Tools, Programming, Utilities',
};

export interface ToolMetadata {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  category?: string;
  priority?: number;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  ogTitle,
  ogDescription,
}: ToolMetadata): Metadata {
  const url = `${siteConfig.url}${path}`;
  const metaTitle = title;
  const metaDescription = description;
  const openGraphTitle = ogTitle || metaTitle;
  const openGraphDescription = ogDescription || metaDescription;
  
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...baseKeywords, ...keywords],
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: siteConfig.locale,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: openGraphTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraphTitle,
      description: openGraphDescription,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitter,
      site: siteConfig.twitter,
    },
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'en-US': url,
      },
    },
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
    other: {
      'article:modified_time': new Date().toISOString(),
      'article:published_time': new Date().toISOString(),
    },
  };
}
