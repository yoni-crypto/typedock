const siteUrl = 'https://typedock.vercel.app';

const tools = [
  { path: '/json-to-typescript', title: 'JSON to TypeScript Converter' },
  { path: '/json-to-zod', title: 'JSON to Zod Schema Generator' },
  { path: '/json-formatter', title: 'JSON Formatter & Validator' },
  { path: '/regex-tester', title: 'RegEx Tester' },
  { path: '/base64', title: 'Base64 Encoder & Decoder' },
  { path: '/color-converter', title: 'Color Converter' },
  { path: '/qr-generator', title: 'QR Code Generator' },
  { path: '/uuid-generator', title: 'UUID Generator' },
  { path: '/hash-generator', title: 'Hash Generator' },
  { path: '/jwt-decoder', title: 'JWT Decoder' },
  { path: '/csv-to-json', title: 'CSV to JSON Converter' },
  { path: '/xml-to-json', title: 'XML to JSON Converter' },
  { path: '/yaml-to-json', title: 'YAML to JSON Converter' },
  { path: '/image-compressor', title: 'Image Compressor' },
  { path: '/ascii-art', title: 'ASCII Art Generator' },
  { path: '/url-encoder', title: 'URL Encoder & Decoder' },
  { path: '/timestamp-converter', title: 'Timestamp Converter' },
  { path: '/json-diff', title: 'JSON Diff' },
  { path: '/validator', title: 'Zod Validator' },
  { path: '/json-to-json-schema', title: 'JSON to JSON Schema Generator' },
  { path: '/json-schema-to-typescript', title: 'JSON Schema to TypeScript' },
  { path: '/typescript-to-zod', title: 'TypeScript to Zod' },
  { path: '/zod-to-typescript', title: 'Zod to TypeScript' },
];

export async function GET() {
  const lastModified = new Date().toISOString();

  const items = tools.map(tool => `
    <item>
      <title><![CDATA[${tool.title}]]></title>
      <link>${siteUrl}${tool.path}</link>
      <guid isPermaLink="true">${siteUrl}${tool.path}</guid>
      <pubDate>${lastModified}</pubDate>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TypeDock - 23 Free Developer Tools</title>
    <description>23 free developer tools: JSON to TypeScript, Zod schema generator, regex tester, color converter, QR generator & more.</description>
    <link>${siteUrl}</link>
    <language>en</language>
    <lastBuildDate>${lastModified}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
