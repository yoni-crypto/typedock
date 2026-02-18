import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'HTML Minifier - Minify & Beautify HTML Online',
  description: 'Minify or beautify HTML code instantly. Free online HTML minifier and formatter. Remove whitespace, comments. 100% client-side.',
  path: '/html-minifier',
  keywords: ['html minifier', 'minify html', 'compress html', 'html beautifier', 'format html', 'html formatter', 'html compressor', 'optimize html'],
});

const structuredData = toolPageSchemas('HTML Minifier', 'Minify or beautify HTML code instantly.', `${siteConfig.url}/html-minifier`, ['Minify HTML', 'Beautify/Format HTML', 'Remove comments', 'Reduce file size', 'Syntax highlighting', '100% client-side'], ['Paste HTML code', 'Choose minify or beautify', 'Copy result'], [{question: 'Is this HTML minifier free?', answer: 'Yes, completely free!'}, {question: 'What does minify do?', answer: 'Removes whitespace, comments, and extra spaces to reduce file size.'}, {question: 'Does it preserve functionality?', answer: 'Yes, minified HTML works exactly the same in browsers.'}], [{name: 'Home', url: siteConfig.url}, {name: 'HTML Minifier', url: `${siteConfig.url}/html-minifier`}], {value: 4.7, count: 423});

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
