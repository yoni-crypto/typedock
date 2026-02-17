import type { ASTType, ObjectType } from '../inference/astTypes';

let counter = 1;

export function generateMockData(ast: ASTType, count: number = 1): unknown {
  counter = 1;
  
  if (count === 1) {
    return generateValue(ast);
  }
  
  if (ast.kind === 'array') {
    return generateValue(ast);
  }
  
  return Array.from({ length: count }, () => generateValue(ast));
}

function generateValue(type: ASTType): unknown {
  switch (type.kind) {
    case 'primitive':
      return generatePrimitive(type.type);
    
    case 'literal':
      return type.value;
    
    case 'array':
      return Array.from({ length: 3 }, () => generateValue(type.elementType));
    
    case 'tuple':
      return type.elements.map(el => 
        el.optional && Math.random() > 0.5 ? undefined : generateValue(el.type)
      ).filter(v => v !== undefined);
    
    case 'record':
      return {
        key1: generateValue(type.valueType),
        key2: generateValue(type.valueType),
        key3: generateValue(type.valueType),
      };
    
    case 'intersection':
      const merged: Record<string, unknown> = {};
      for (const t of type.types) {
        const value = generateValue(t);
        if (typeof value === 'object' && value !== null) {
          Object.assign(merged, value);
        }
      }
      return merged;
    
    case 'reference':
      return { id: counter++ };
    
    case 'object':
      return generateObject(type);
    
    case 'union':
      const randomType = type.types[Math.floor(Math.random() * type.types.length)];
      return generateValue(randomType);
    
    case 'enum':
      return type.values[Math.floor(Math.random() * type.values.length)];
    
    default:
      return null;
  }
}

function generatePrimitive(type: string): unknown {
  switch (type) {
    case 'string':
      return generateString();
    case 'number':
      return generateNumber();
    case 'boolean':
      return Math.random() > 0.5;
    case 'null':
      return null;
    default:
      return null;
  }
}

function generateString(): string {
  const templates = [
    `user${counter}`,
    `example${counter}@email.com`,
    `Item ${counter}`,
    `Description ${counter}`,
    `Name ${counter}`,
  ];
  counter++;
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateNumber(): number {
  const options = [
    counter++,
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 1000),
    parseFloat((Math.random() * 100).toFixed(2)),
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function generateObject(obj: ObjectType): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const [key, prop] of obj.properties) {
    if (prop.optional && Math.random() > 0.7) {
      continue;
    }
    result[key] = generateValue(prop.type);
  }
  
  if (obj.indexSignature) {
    result[`dynamic${counter++}`] = generateValue(obj.indexSignature.valueType);
  }
  
  return result;
}
