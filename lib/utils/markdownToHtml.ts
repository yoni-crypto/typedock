import { marked, Tokens } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  gfm: true,
  breaks: true,
});

const renderer = new marked.Renderer();

renderer.code = ({ text, lang }: Tokens.Code) => {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

renderer.codespan = ({ text }: Tokens.Codespan) => {
  return `<code class="inline-code">${text}</code>`;
};

renderer.heading = ({ text, depth }: Tokens.Heading) => {
  const id = text.toLowerCase().replace(/[^\w]+/g, '-');
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

renderer.link = ({ href, title, text }: Tokens.Link) => {
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
};

renderer.table = ({ header, rows }: Tokens.Table) => {
  const headerHtml = header.map(cell => `<th>${cell.text}</th>`).join('');
  const rowsHtml = rows.map(row => 
    `<tr>${row.map(cell => `<td>${cell.text}</td>`).join('')}</tr>`
  ).join('');
  return `<div class="table-wrapper"><table><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
};

renderer.blockquote = ({ text }: Tokens.Blockquote) => {
  return `<blockquote class="md-blockquote">${text}</blockquote>`;
};

renderer.listitem = ({ text, task, checked }: Tokens.ListItem) => {
  if (task) {
    return `<li class="task-item"><input type="checkbox" ${checked ? 'checked' : ''} disabled /> ${text}</li>`;
  }
  return `<li>${text}</li>`;
};

renderer.image = ({ href, title, text }: Tokens.Image) => {
  const titleAttr = title ? ` title="${title}"` : '';
  return `<img src="${href}" alt="${text}"${titleAttr} loading="lazy" />`;
};

marked.use({ renderer });

export function markdownToHtml(markdown: string): string {
  if (!markdown.trim()) return '';
  return marked(markdown) as string;
}

export function getHtmlStyles(darkMode: boolean = false): string {
  const isDark = darkMode;
  
  const textColor = isDark ? '#e5e5e5' : '#1f2937';
  const bgColor = isDark ? '#171717' : '#ffffff';
  const borderColor = isDark ? '#404040' : '#e5e7eb';
  const headingBorder = isDark ? '#404040' : '#e5e7eb';
  const codeBg = isDark ? '#262626' : '#f3f4f6';
  const preBg = isDark ? '#0d1117' : '#1e293b';
  const linkColor = isDark ? '#60a5fa' : '#2563eb';
  const tableHeaderBg = isDark ? '#262626' : '#f9fafb';
  const tableRowBg = isDark ? '#1a1a1a' : '#f9fafb';
  const blockquoteBg = isDark ? '#262626' : '#f9fafb';
  const blockquoteText = isDark ? '#a3a3a3' : '#4b5563';

  return `
    <style>
      .markdown-preview {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.7;
        color: ${textColor};
        background: ${bgColor};
        padding: 1rem;
      }
      .markdown-preview h1 { font-size: 2.25em; font-weight: 700; margin: 1.5em 0 0.75em; border-bottom: 1px solid ${headingBorder}; padding-bottom: 0.3em; }
      .markdown-preview h2 { font-size: 1.75em; font-weight: 600; margin: 1.25em 0 0.5em; border-bottom: 1px solid ${headingBorder}; padding-bottom: 0.25em; }
      .markdown-preview h3 { font-size: 1.5em; font-weight: 600; margin: 1em 0 0.5em; }
      .markdown-preview h4 { font-size: 1.25em; font-weight: 600; margin: 1em 0 0.5em; }
      .markdown-preview h5, .markdown-preview h6 { font-size: 1em; font-weight: 600; margin: 1em 0 0.5em; }
      .markdown-preview p { margin: 1em 0; }
      .markdown-preview a { color: ${linkColor}; text-decoration: none; }
      .markdown-preview a:hover { text-decoration: underline; }
      .markdown-preview ul, .markdown-preview ol { padding-left: 1.5em; margin: 1em 0; }
      .markdown-preview li { margin: 0.5em 0; }
      .markdown-preview .task-item { list-style: none; margin-left: -1.5em; }
      .markdown-preview .task-item input { margin-right: 0.5em; }
      .markdown-preview code.inline-code { 
        background: ${codeBg}; 
        padding: 0.2em 0.4em; 
        border-radius: 4px; 
        font-size: 0.875em;
        font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
        color: ${textColor};
      }
      .markdown-preview pre {
        background: ${preBg};
        padding: 1em;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1em 0;
      }
      .markdown-preview pre code {
        background: none;
        padding: 0;
        font-size: 0.875em;
        color: #e2e8f0;
      }
      .markdown-preview .table-wrapper { overflow-x: auto; margin: 1em 0; }
      .markdown-preview table { 
        width: 100%; 
        border-collapse: collapse; 
        margin: 1em 0; 
      }
      .markdown-preview th, .markdown-preview td { 
        border: 1px solid ${borderColor}; 
        padding: 0.75em; 
        text-align: left; 
      }
      .markdown-preview th { 
        background: ${tableHeaderBg}; 
        font-weight: 600; 
      }
      .markdown-preview tr:nth-child(even) { background: ${tableRowBg}; }
      .markdown-preview .md-blockquote { 
        border-left: 4px solid ${linkColor}; 
        margin: 1em 0; 
        padding: 0.5em 1em; 
        background: ${blockquoteBg}; 
        color: ${blockquoteText};
      }
      .markdown-preview hr { 
        border: none; 
        border-top: 1px solid ${borderColor}; 
        margin: 2em 0; 
      }
      .markdown-preview img { 
        max-width: 100%; 
        height: auto; 
        border-radius: 8px; 
        margin: 1em 0; 
      }
      
      /* highlight.js theme */
      .hljs { color: #e2e8f0; background: ${preBg}; }
      .hljs-keyword, .hljs-selector-tag, .hljs-built_in { color: #c084fc; }
      .hljs-string, .hljs-attr { color: #86efac; }
      .hljs-number, .hljs-literal { color: #f9a8d4; }
      .hljs-comment { color: #64748b; font-style: italic; }
      .hljs-function, .hljs-title { color: #60a5fa; }
      .hljs-variable, .hljs-params { color: #fbbf24; }
      .hljs-type, .hljs-class { color: #38bdf8; }
      .hljs-emphasis { font-style: italic; }
      .hljs-strong { font-weight: bold; }
    </style>
  `;
}
