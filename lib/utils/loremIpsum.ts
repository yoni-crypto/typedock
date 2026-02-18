export interface LoremOptions {
  paragraphs: number;
  words: number;
  bytes: number;
  sentences: number;
  units: 'words' | 'sentences' | 'paragraphs' | 'bytes';
}

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'nunc', 'massa', 'velit',
  'quam', 'ligula', 'pretium', 'lobortis', 'consectetur', 'turpis', 'cursus',
  'vestibulum', 'odio', 'aenean', 'potenti', 'vitae', 'tortor', 'condimentum',
  'luctus', 'nec', 'molestie', 'suscipit', 'pellentesque', 'habitant', 'morbi',
  'senectus', 'netus', 'malesuada', 'fames', 'ac', 'turpis', 'egestas', 'proin',
  'sagittis', 'nisl', 'rhoncus', 'mattis', 'massa', 'vitae', 'augue', 'eget',
  'dictum', 'sollicitudin', 'fringilla', 'porta', 'eros', 'bibendum', 'ultrices',
  'ipsum', 'faucibus', 'interdum', 'pretium', ' Fusce', 'dapibus', 'tellus',
  'cursus', 'commodo', 'nibh', 'praesent', 'tristique', 'magna', 'vestibulum',
  'laoreet', 'posuere', 'natoque', 'penatibus', 'magnis', 'dis', 'parturient',
  'montes', 'nascetur', 'ridiculus', 'mus', 'mauris', 'vitae', 'ultricies', 'leo',
  'integer', 'facilisis', 'lacinia', 'risus', 'commodo', 'ullamcorper', 'nulla',
  'vitae', 'mattis', 'nibh', 'metus', 'aenean', 'euismod', 'maecenas', 'ultrices',
  'iaculis', 'nunc', 'proin', 'varius', 'magna', 'blandit', 'massa', 'tincidunt',
  'ornare', 'lectus', 'vestibulum', 'maecenas', 'sed', 'eget', 'elit', 'nullam',
];

const loremSentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  'Tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit.',
  'Nemo enim ipsam quia voluptas sit aspernatur aut odit aut fugit.',
  'Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.',
  'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.',
  'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus.',
  'Maiores alias consequatur aut perferendis doloribus asperiores repellat.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  'Ut labore et dolore magnam aliquam quaerat voluptatem. Enim ad minim veniam.',
  'Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid.',
];

function generateWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
  }
  return words.join(' ');
}

function generateSentences(count: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    sentences.push(loremSentences[Math.floor(Math.random() * loremSentences.length)]);
  }
  return sentences.join(' ');
}

function generateParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    paragraphs.push(generateSentences(sentenceCount));
  }
  return paragraphs.join('\n\n');
}

export function generateLorem(options: Partial<LoremOptions> = {}): string {
  const { units = 'paragraphs', paragraphs = 4, words = 50, sentences = 10, bytes = 0 } = options;
  
  switch (units) {
    case 'words':
      return generateWords(words);
    case 'sentences':
      return generateSentences(sentences);
    case 'paragraphs':
      return generateParagraphs(paragraphs);
    case 'bytes':
      const text = generateWords(words * 5);
      const encoder = new TextEncoder();
      const encoded = encoder.encode(text);
      const truncated = encoded.slice(0, bytes);
      const decoder = new TextDecoder('utf-8', { fatal: false });
      return decoder.decode(truncated);
    default:
      return generateParagraphs(paragraphs);
  }
}

export function generateRandomText(type: 'words' | 'sentences' | 'paragraphs' | 'bytes', count: number): string {
  return generateLorem({ units: type, [type]: count });
}
