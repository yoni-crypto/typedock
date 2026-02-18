import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'XML Formatter - Beautify & Minify XML Online',
  description: 'Format, beautify, or minify XML code instantly. Free online XML formatter with syntax highlighting. 100% client-side.',
  path: '/xml-formatter',
  keywords: ['xml formatter', 'xml beautifier', 'format xml', 'xml minifier', 'prettify xml', 'xml parser', 'xml compressor', 'format xml online'],
});

const structuredData = toolPageSchemas('XML Formatter', 'Format, beautify, or minify XML code.', `${siteConfig.url}/xml-formatter`, ['Format XML', 'Minify XML', 'Syntax highlighting', 'Copy result', 'Error detection', '100% client-side'], ['Paste XML code', 'Choose format or minify', 'Copy result'], [{question: 'Is this XML formatter free?', answer: 'Yes, completely free!'}, {question: 'Does it validate XML?', answer: 'It formats valid XML. Invalid XML may not format correctly.'}, {question: 'Does it preserve attributes?', answer: 'Yes, all attributes and structure are preserved.'}], [{name: 'Home', url: siteConfig.url}, {name: 'XML Formatter', url: `${siteConfig.url}/xml-formatter`}], {value: 4.7, count: 312});

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
