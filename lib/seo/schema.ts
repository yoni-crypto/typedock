export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TypeDock',
  url: 'https://typedock.vercel.app',
  description: 'Fast, free JSON to TypeScript and Zod converter. Generate TypeScript interfaces and Zod schemas instantly in your browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'JSON to TypeScript converter',
    'JSON to Zod schema generator',
    'Smart type inference',
    'Optional field detection',
    'Union type support',
    'Nested object handling',
    'Client-side processing',
    'No login required',
  ],
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TypeDock',
  url: 'https://typedock.vercel.app',
  logo: 'https://typedock.vercel.app/icon-192.png',
  sameAs: [
    'https://github.com/yoni-crypto/typedock',
  ],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
