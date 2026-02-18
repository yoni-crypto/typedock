import type { Metadata } from 'next';
import { generatePageMetadata, siteConfig } from '@/lib/seo/metadata';
import { toolPageSchemas } from '@/lib/seo/structuredData';

export const metadata: Metadata = generatePageMetadata({
  title: 'SQL Formatter - Beautify & Format SQL Queries Online',
  description: 'Format, beautify, and minify SQL queries instantly. Support for MySQL, PostgreSQL, SQLite, BigQuery, and more. Free online SQL formatter with syntax highlighting. 100% client-side.',
  path: '/sql-formatter',
  keywords: [
    'sql formatter',
    'sql beautifier',
    'sql prettifier',
    'format sql query',
    'sql syntax highlighter',
    'mysql formatter',
    'postgresql formatter',
    'sqlite formatter',
    'bigquery formatter',
    'sql formatter online',
    'format sql free',
    'sql code formatter',
    'sql query formatter',
    'sql beautify tool',
    'sql minifier',
  ],
});

const structuredData = toolPageSchemas(
  'SQL Formatter',
  'Format, beautify, and minify SQL queries instantly. Support for MySQL, PostgreSQL, SQLite, BigQuery, and more. Free online tool.',
  `${siteConfig.url}/sql-formatter`,
  [
    'Support for 7 SQL dialects',
    'MySQL, PostgreSQL, SQLite, BigQuery, PL/SQL, DB2',
    'Customizable indentation',
    'Keyword case options (UPPER/lower/preserve)',
    'Minify SQL queries',
    '100% client-side processing',
  ],
  [
    'Paste your SQL query into the editor',
    'Select your SQL dialect (MySQL, PostgreSQL, etc.)',
    'Customize formatting options if needed',
    'Copy the formatted SQL code',
  ],
  [
    {
      question: 'Is this SQL formatter free?',
      answer: 'Yes, completely free! No sign-up required, no usage limits, and 100% client-side processing means your data never leaves your browser.',
    },
    {
      question: 'What SQL dialects are supported?',
      answer: 'We support 7 SQL dialects: Standard SQL, MySQL, PostgreSQL, PL/SQL, BigQuery, DB2, and SQLite.',
    },
    {
      question: 'Can I minify SQL queries?',
      answer: 'Yes! Click the "Minified" button to compress your SQL into a single line, removing all extra whitespace.',
    },
    {
      question: 'Does it validate SQL syntax?',
      answer: 'Yes, the tool will show validation errors if your SQL syntax is invalid, helping you catch mistakes before running queries.',
    },
    {
      question: 'Is my data secure when using this tool?',
      answer: '100% secure! All formatting happens locally in your browser using JavaScript. Your SQL queries are never sent to any server.',
    },
  ],
  [
    { name: 'Home', url: siteConfig.url },
    { name: 'SQL Formatter', url: `${siteConfig.url}/sql-formatter` },
  ],
  { value: 4.9, count: 2134 }
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
