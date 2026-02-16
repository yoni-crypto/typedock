import type { ASTType, ObjectType } from '../inference/astTypes';

export function generateInterface(ast: ASTType, name: string): string {
  if (ast.kind === 'array') {
    return `export type ${name} = ${generateType(ast, 0)};`;
  }
  return `export interface ${name} ${generateType(ast, 0)}`;
}

function generateType(type: ASTType, depth: number): string {
  switch (type.kind) {
    case 'primitive':
      return type.type === 'null' ? 'null' : type.type;
    
    case 'literal':
      return JSON.stringify(type.value);
    
    case 'array':
      return generateArrayType(type.elementType, depth);
    
    case 'object':
      return generateObjectType(type, depth);
    
    case 'union':
      return type.types.map(t => generateType(t, depth)).join(' | ');
    
    case 'enum':
      return type.values.map(v => `"${v}"`).join(' | ');
    
    default:
      return 'unknown';
  }
}

function generateArrayType(elementType: ASTType, depth: number): string {
  if (elementType.kind === 'union') {
    return `(${generateType(elementType, depth)})[]`;
  }
  return `${generateType(elementType, depth)}[]`;
}

function generateObjectType(obj: ObjectType, depth: number): string {
  if (obj.properties.size === 0) {
    return '{}';
  }

  const indent = '  '.repeat(depth + 1);
  const closeIndent = '  '.repeat(depth);
  const lines: string[] = [];

  for (const [key, prop] of obj.properties) {
    const optional = prop.optional ? '?' : '';
    const propType = generateType(prop.type, depth + 1);
    lines.push(`${indent}${key}${optional}: ${propType};`);
  }

  return `{\n${lines.join('\n')}\n${closeIndent}}`;
}
