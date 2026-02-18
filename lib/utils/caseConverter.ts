export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => 
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+|_|-/g, '');
}

export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, letter => letter.toUpperCase())
    .replace(/\s+|_|-/g, '');
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/\s+|-/g, '_')
    .replace(/^_/, '')
    .toLowerCase();
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/\s+|_/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}

export function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}

export function toDotCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '.$1')
    .replace(/\s+|_|-/g, '.')
    .replace(/^\./, '')
    .toLowerCase();
}

export function toTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+|_|-/g, ' ')
    .replace(/^\s/, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function toSentenceCase(str: string): string {
  const result = str
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+|_|-/g, ' ')
    .trim()
    .toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function toHeaderCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+|_|-/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');
}

export function toParamCase(str: string): string {
  return toKebabCase(str);
}

export function toPathCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '/$1')
    .replace(/\s+|_|-/g, '/')
    .replace(/^\//, '')
    .toLowerCase();
}

export function toSwapCase(str: string): string {
  return str
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        return char.toLowerCase();
      } else if (char >= 'a' && char <= 'z') {
        return char.toUpperCase();
      }
      return char;
    })
    .join('');
}

export function toInverseCase(str: string): string {
  return str
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        return char.toLowerCase();
      } else if (char >= 'a' && char <= 'z') {
        return char.toUpperCase();
      }
      return char;
    })
    .join('');
}

export function toUpperFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toLowerFirst(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function getAllCases(str: string) {
  return {
    camelCase: toCamelCase(str),
    pascalCase: toPascalCase(str),
    snakeCase: toSnakeCase(str),
    kebabCase: toKebabCase(str),
    constantCase: toConstantCase(str),
    dotCase: toDotCase(str),
    titleCase: toTitleCase(str),
    sentenceCase: toSentenceCase(str),
    headerCase: toHeaderCase(str),
    pathCase: toPathCase(str),
    upperCase: str.toUpperCase(),
    lowerCase: str.toLowerCase(),
    swapCase: toSwapCase(str),
  };
}
