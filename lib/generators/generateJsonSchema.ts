import type { ASTType, ObjectType } from '../inference/astTypes';

export function generateJsonSchema(ast: ASTType, title: string = 'Schema'): string {
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title,
    ...astToJsonSchema(ast)
  };
  
  return JSON.stringify(schema, null, 2);
}

function astToJsonSchema(type: ASTType): any {
  switch (type.kind) {
    case 'primitive':
      return { type: type.type === 'null' ? 'null' : type.type };
    
    case 'literal':
      return { const: type.value };
    
    case 'array':
      return {
        type: 'array',
        items: astToJsonSchema(type.elementType)
      };
    
    case 'tuple':
      return {
        type: 'array',
        prefixItems: type.elements.map(el => astToJsonSchema(el.type)),
        minItems: type.elements.filter(el => !el.optional).length,
        maxItems: type.elements.length
      };
    
    case 'record':
      return {
        type: 'object',
        additionalProperties: astToJsonSchema(type.valueType)
      };
    
    case 'intersection':
      return {
        allOf: type.types.map(t => astToJsonSchema(t))
      };
    
    case 'object':
      return generateObjectSchema(type);
    
    case 'union':
      // Check if it's an enum (all string literals)
      const allStringLiterals = type.types.every(t => 
        t.kind === 'literal' && typeof t.value === 'string'
      );
      
      if (allStringLiterals) {
        return {
          type: 'string',
          enum: type.types.map(t => (t as any).value)
        };
      }
      
      return {
        oneOf: type.types.map(t => astToJsonSchema(t))
      };
    
    case 'enum':
      return {
        type: 'string',
        enum: type.values
      };
    
    default:
      return {};
  }
}

function generateObjectSchema(obj: ObjectType): any {
  const properties: Record<string, any> = {};
  const required: string[] = [];
  
  for (const [key, prop] of obj.properties) {
    properties[key] = astToJsonSchema(prop.type);
    if (!prop.optional) {
      required.push(key);
    }
  }
  
  const schema: any = {
    type: 'object',
    properties
  };
  
  if (required.length > 0) {
    schema.required = required;
  }
  
  if (obj.indexSignature) {
    schema.additionalProperties = astToJsonSchema(obj.indexSignature.valueType);
  } else {
    schema.additionalProperties = false;
  }
  
  return schema;
}
