import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { ConditionalAnalytics } from "@/components/analytics/ConditionalAnalytics";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { baseMetadata, siteConfig, viewport as viewportConfig } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema, webPageSchema } from "@/lib/seo/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport = viewportConfig;

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: `${siteConfig.name} - 23 Free Developer Tools | JSON, TypeScript, Regex & More`,
    template: `%s | ${siteConfig.name}`,
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': `${siteConfig.url}/rss.xml`,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
};

const homePageSchema = webPageSchema(
  `${siteConfig.name} - 23 Free Developer Tools`,
  siteConfig.description,
  siteConfig.url
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="geo.region" content="global" />
        <meta name="geo.placename" content="Worldwide" />
        <meta name="ICBM" content="0, 0" />
        <meta name="DC.title" content={siteConfig.name} />
        <meta name="DC.identifier" content={siteConfig.url} />
        <meta name="DC.language" content="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <ThemeProvider>
            {children}
            <CookieConsent />
          </ThemeProvider>
        </PostHogProvider>
        <ConditionalAnalytics />
      </body>
    </html>
  );
}
