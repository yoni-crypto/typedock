import type { ASTType, ObjectType } from '../inference/astTypes';

export function generateZodSchema(
  ast: ASTType,
  name: string,
  options: { strict?: boolean; includeInterface?: boolean } = {}
): string {
  const { strict = false, includeInterface = false } = options;
  
  const lines: string[] = [];
  
  lines.push(`import { z } from 'zod';`);
  lines.push('');
  
  if (includeInterface) {
    if (ast.kind === 'array') {
      lines.push(`export type ${name} = ${generateTypeScriptType(ast, 0)};`);
    } else {
      lines.push(`export interface ${name} ${generateTypeScriptType(ast, 0)}`);
    }
    lines.push('');
  }
  
  const schemaName = `${name}Schema`;
  lines.push(`export const ${schemaName} = ${generateZodType(ast, 0, strict)};`);
  lines.push('');
  lines.push(`export function parse${name}(data: unknown) {`);
  lines.push(`  return ${schemaName}.parse(data);`);
  lines.push(`}`);
  
  return lines.join('\n');
}

function generateZodType(type: ASTType, depth: number, strict: boolean): string {
  switch (type.kind) {
    case 'primitive':
      return generatePrimitiveZod(type.type);
    
    case 'literal':
      return `z.literal(${JSON.stringify(type.value)})`;
    
    case 'array':
      return `z.array(${generateZodType(type.elementType, depth, strict)})`;
    
    case 'tuple':
      const tupleElements = type.elements.map(el => {
        const zodType = generateZodType(el.type, depth, strict);
        return el.optional ? `${zodType}.optional()` : zodType;
      });
      return `z.tuple([${tupleElements.join(', ')}])`;
    
    case 'record':
      // For Record<string, T> -> z.record(z.string())
      if (type.keyType.kind === 'primitive' && type.keyType.type === 'string') {
        return `z.record(${generateZodType(type.valueType, depth, strict)})`;
      }
      return `z.record(${generateZodType(type.keyType, depth, strict)}, ${generateZodType(type.valueType, depth, strict)})`;
    
    case 'intersection':
      return `z.intersection(${type.types.map(t => generateZodType(t, depth, strict)).join(', ')})`;
    
    case 'reference':
      // For recursive types, use z.lazy
      return `${type.name}Schema`;
    
    case 'object':
      return generateObjectZod(type, depth, strict);
    
    case 'union':
      // Check if all union members are string literals -> use z.enum()
      const allStringLiterals = type.types.every(t => 
        t.kind === 'literal' && typeof t.value === 'string'
      );
      
      if (allStringLiterals) {
        const values = type.types
          .filter((t): t is Extract<ASTType, { kind: 'literal'; value: string }> => 
            t.kind === 'literal' && typeof t.value === 'string'
          )
          .map(t => t.value);
        return `z.enum([${values.map(v => `"${v}"`).join(', ')}])`;
      }
      
      return `z.union([${type.types.map(t => generateZodType(t, depth, strict)).join(', ')}])`;
    
    case 'enum':
      return `z.enum([${type.values.map(v => `"${v}"`).join(', ')}])`;
    
    default:
      return 'z.unknown()';
  }
}

function generatePrimitiveZod(type: string): string {
  switch (type) {
    case 'string': return 'z.string()';
    case 'number': return 'z.number()';
    case 'boolean': return 'z.boolean()';
    case 'null': return 'z.null()';
    case 'unknown': return 'z.unknown()';
    default: return 'z.unknown()';
  }
}

function generateObjectZod(obj: ObjectType, depth: number, strict: boolean): string {
  // Handle index signature only (no properties)
  if (obj.properties.size === 0 && obj.indexSignature) {
    return `z.record(${generateZodType(obj.indexSignature.valueType, depth, strict)})`;
  }
  
  if (obj.properties.size === 0) {
    return 'z.object({})';
  }

  const indent = '  '.repeat(depth + 1);
  const closeIndent = '  '.repeat(depth);
  const lines: string[] = [];

  for (const [key, prop] of obj.properties) {
    let zodType = generateZodType(prop.type, depth + 1, strict);
    if (prop.optional) {
      zodType += '.optional()';
    }
    lines.push(`${indent}${key}: ${zodType},`);
  }

  const strictSuffix = strict ? '.strict()' : '';
  let result = `z.object({\n${lines.join('\n')}\n${closeIndent}})${strictSuffix}`;
  
  // Handle index signature with properties
  if (obj.indexSignature) {
    result += `.and(z.record(${generateZodType(obj.indexSignature.valueType, depth, strict)}))`;
  }
  
  return result;
}

function generateTypeScriptType(type: ASTType, depth: number): string {
  switch (type.kind) {
    case 'primitive':
      return type.type === 'null' ? 'null' : type.type;
    
    case 'literal':
      return JSON.stringify(type.value);
    
    case 'array':
      return generateArrayTypeScript(type.elementType, depth);
    
    case 'tuple':
      const tupleElements = type.elements.map(el => {
        const tsType = generateTypeScriptType(el.type, depth);
        return el.optional ? `${tsType}?` : tsType;
      });
      return `[${tupleElements.join(', ')}]`;
    
    case 'record':
      return `Record<${generateTypeScriptType(type.keyType, depth)}, ${generateTypeScriptType(type.valueType, depth)}>`;
    
    case 'intersection':
      return type.types.map(t => generateTypeScriptType(t, depth)).join(' & ');
    
    case 'reference':
      return type.name;
    
    case 'object':
      return generateObjectTypeScript(type, depth);
    
    case 'union':
      return type.types.map(t => generateTypeScriptType(t, depth)).join(' | ');
    
    case 'enum':
      return type.values.map(v => `"${v}"`).join(' | ');
    
    default:
      return 'unknown';
  }
}

function generateArrayTypeScript(elementType: ASTType, depth: number): string {
  if (elementType.kind === 'union') {
    return `(${generateTypeScriptType(elementType, depth)})[]`;
  }
  return `${generateTypeScriptType(elementType, depth)}[]`;
}

function generateObjectTypeScript(obj: ObjectType, depth: number): string {
  if (obj.properties.size === 0) {
    return '{}';
  }

  const indent = '  '.repeat(depth + 1);
  const closeIndent = '  '.repeat(depth);
  const lines: string[] = [];

  for (const [key, prop] of obj.properties) {
    const optional = prop.optional ? '?' : '';
    const propType = generateTypeScriptType(prop.type, depth + 1);
    lines.push(`${indent}${key}${optional}: ${propType};`);
  }

  return `{\n${lines.join('\n')}\n${closeIndent}}`;
}
