import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  fence: '```',
});

turndownService.use(gfm);

turndownService.addRule('input', {
  filter: ['input'],
  replacement: () => '',
});

turndownService.addRule('textarea', {
  filter: ['textarea'],
  replacement: () => '',
});

turndownService.addRule('br', {
  filter: ['br'],
  replacement: () => '  \n',
});

turndownService.addRule('img', {
  filter: ['img'],
  replacement: function (_content: string, node: Node): string {
    const element = node as HTMLImageElement;
    const alt = element.alt || '';
    const src = element.src || '';
    return `![${alt}](${src})`;
  },
});

export function htmlToMarkdown(html: string): string {
  if (!html.trim()) return '';
  return turndownService.turndown(html);
}
