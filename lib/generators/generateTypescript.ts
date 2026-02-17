import type { ASTType, ObjectType } from '../inference/astTypes';

export function generateInterface(ast: ASTType, name: string): string {
  if (ast.kind === 'array') {
    return `export type ${name} = ${generateType(ast, 0)};`;
  }
  if (ast.kind === 'tuple') {
    return `export type ${name} = ${generateType(ast, 0)};`;
  }
  if (ast.kind === 'union') {
    return `export type ${name} = ${generateType(ast, 0)};`;
  }
  if (ast.kind === 'intersection') {
    return `export type ${name} = ${generateType(ast, 0)};`;
  }
  if (ast.kind === 'record') {
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
    
    case 'tuple':
      const tupleElements = type.elements.map(el => {
        const tsType = generateType(el.type, depth);
        return el.optional ? `${tsType}?` : tsType;
      });
      return `[${tupleElements.join(', ')}]`;
    
    case 'record':
      return `Record<${generateType(type.keyType, depth)}, ${generateType(type.valueType, depth)}>`;
    
    case 'intersection':
      return type.types.map(t => generateType(t, depth)).join(' & ');
    
    case 'reference':
      return type.name;
    
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
  if (obj.properties.size === 0 && obj.indexSignature) {
    return `Record<${obj.indexSignature.keyType}, ${generateType(obj.indexSignature.valueType, depth)}>`;
  }
  
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
  
  if (obj.indexSignature) {
    lines.push(`${indent}[key: ${obj.indexSignature.keyType}]: ${generateType(obj.indexSignature.valueType, depth + 1)};`);
  }

  return `{\n${lines.join('\n')}\n${closeIndent}}`;
}
