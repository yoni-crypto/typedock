export function jsonSchemaToTypescript(schemaJson: string, typeName: string = 'Schema'): string {
  try {
    const schema = JSON.parse(schemaJson);
    return generateTypeFromSchema(schema, typeName);
  } catch {
    return '// Error: Invalid JSON Schema';
  }
}

function generateTypeFromSchema(schema: any, name: string): string {
  if (!schema || typeof schema !== 'object') {
    return `export type ${name} = unknown;`;
  }

  const typeStr = schemaToType(schema, 0);
  
  if (schema.type === 'object' || schema.properties) {
    return `export interface ${name} ${typeStr}`;
  }
  
  return `export type ${name} = ${typeStr};`;
}

function schemaToType(schema: any, depth: number): string {
  // Handle $ref
  if (schema.$ref) {
    return schema.$ref.split('/').pop() || 'unknown';
  }

  // Handle const
  if ('const' in schema) {
    return JSON.stringify(schema.const);
  }

  // Handle enum
  if (schema.enum) {
    return schema.enum.map((v: any) => JSON.stringify(v)).join(' | ');
  }

  // Handle allOf (intersection)
  if (schema.allOf) {
    return schema.allOf.map((s: any) => schemaToType(s, depth)).join(' & ');
  }

  // Handle oneOf/anyOf (union)
  if (schema.oneOf || schema.anyOf) {
    const schemas = schema.oneOf || schema.anyOf;
    return schemas.map((s: any) => schemaToType(s, depth)).join(' | ');
  }

  // Handle type
  if (!schema.type) {
    return 'unknown';
  }

  if (Array.isArray(schema.type)) {
    return schema.type.map((t: string) => typeMap[t] || t).join(' | ');
  }

  switch (schema.type) {
    case 'string':
      return 'string';
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'null':
      return 'null';
    case 'array':
      if (schema.items) {
        if (Array.isArray(schema.items)) {
          // Tuple
          return `[${schema.items.map((item: any) => schemaToType(item, depth)).join(', ')}]`;
        }
        return `${schemaToType(schema.items, depth)}[]`;
      }
      return 'unknown[]';
    case 'object':
      return generateObjectType(schema, depth);
    default:
      return 'unknown';
  }
}

function generateObjectType(schema: any, depth: number): string {
  if (!schema.properties && schema.additionalProperties) {
    const valueType = schema.additionalProperties === true 
      ? 'unknown' 
      : schemaToType(schema.additionalProperties, depth);
    return `Record<string, ${valueType}>`;
  }

  if (!schema.properties) {
    return '{}';
  }

  const indent = '  '.repeat(depth + 1);
  const closeIndent = '  '.repeat(depth);
  const lines: string[] = [];
  const required = new Set(schema.required || []);

  for (const [key, propSchema] of Object.entries(schema.properties)) {
    const optional = !required.has(key) ? '?' : '';
    const type = schemaToType(propSchema, depth + 1);
    lines.push(`${indent}${key}${optional}: ${type};`);
  }

  if (schema.additionalProperties && schema.additionalProperties !== false) {
    const valueType = schema.additionalProperties === true 
      ? 'unknown' 
      : schemaToType(schema.additionalProperties, depth);
    lines.push(`${indent}[key: string]: ${valueType};`);
  }

  return `{\n${lines.join('\n')}\n${closeIndent}}`;
}

const typeMap: Record<string, string> = {
  string: 'string',
  number: 'number',
  integer: 'number',
  boolean: 'boolean',
  null: 'null',
  object: 'object',
  array: 'unknown[]',
};
