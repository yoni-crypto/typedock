import { siteConfig } from './metadata';

export interface FAQItem {
  question: string;
  answer: string;
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/icon.png`,
    width: 512,
    height: 512,
  },
  description: siteConfig.description,
  sameAs: [
    siteConfig.github,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Technical Support',
    availableLanguage: ['English'],
  },
  founder: {
    '@type': 'Person',
    name: siteConfig.author,
  },
  foundingDate: '2024',
  areaServed: 'Worldwide',
  knowsAbout: [
    'JSON Processing',
    'TypeScript Development',
    'Zod Validation',
    'Regular Expressions',
    'Data Conversion',
    'Developer Tools',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  inLanguage: siteConfig.language,
  copyrightYear: new Date().getFullYear(),
  creator: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
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

export const softwareAppSchema = (
  name: string, 
  description: string, 
  url: string,
  features?: string[],
  rating?: { value: number; count: number }
) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0],
  },
  browserRequirements: 'Requires JavaScript. Works in Chrome, Firefox, Safari, Edge (latest 2 versions).',
  softwareVersion: '1.0',
  fileSize: '0MB',
  featureList: features?.join(', ') || 'Developer tools, Data conversion, Code generation',
  screenshot: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/og-image.png`,
  },
  aggregateRating: rating ? {
    '@type': 'AggregateRating',
    ratingValue: rating.value,
    ratingCount: rating.count,
    bestRating: 5,
    worstRating: 1,
  } : undefined,
  author: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  copyrightHolder: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
});

export const howToSchema = (name: string, description: string, steps: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  totalTime: 'PT5M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: 0,
  },
  step: steps.map((text, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    text,
    name: `Step ${index + 1}`,
  })),
});

export const faqSchema = (faqs: FAQItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const articleSchema = (
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
  image?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  url,
  image: image || `${siteConfig.url}/og-image.png`,
  datePublished,
  dateModified,
  author: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/icon.png`,
    },
  },
  inLanguage: siteConfig.language,
  isAccessibleForFree: true,
});

export const webPageSchema = (
  title: string,
  description: string,
  url: string,
  dateModified?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url,
  lastReviewed: dateModified || new Date().toISOString().split('T')[0],
  dateModified: dateModified || new Date().toISOString().split('T')[0],
  inLanguage: siteConfig.language,
  isPartOf: {
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  author: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
});

export const productSchema = (
  name: string,
  description: string,
  url: string,
  rating?: { value: number; count: number }
) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  url,
  brand: {
    '@type': 'Brand',
    name: siteConfig.name,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0],
    url,
  },
  aggregateRating: rating ? {
    '@type': 'AggregateRating',
    ratingValue: rating.value,
    ratingCount: rating.count,
    bestRating: 5,
    worstRating: 1,
  } : undefined,
  review: rating ? {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.value,
      bestRating: 5,
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  } : undefined,
});

export const toolPageSchemas = (
  toolName: string,
  toolDescription: string,
  toolUrl: string,
  features: string[],
  steps: string[],
  faqs: FAQItem[],
  breadcrumbs: { name: string; url: string }[],
  rating?: { value: number; count: number }
) => [
  webPageSchema(toolName, toolDescription, toolUrl),
  breadcrumbSchema(breadcrumbs),
  softwareAppSchema(toolName, toolDescription, toolUrl, features, rating),
  howToSchema(`How to use ${toolName}`, `Step-by-step guide for using ${toolName}`, steps),
  faqSchema(faqs),
];

export const homePageSchemas = () => [
  organizationSchema,
  websiteSchema,
  webPageSchema(
    `${siteConfig.name} - 23 Free Developer Tools`,
    siteConfig.description,
    siteConfig.url
  ),
];
