import type { ASTType, ArrayType, ObjectType, PrimitiveType } from './astTypes';

export function inferType(value: unknown): ASTType {
  if (value === null) {
    return { kind: 'primitive', type: 'null' };
  }

  if (typeof value === 'string') {
    return { kind: 'primitive', type: 'string' };
  }

  if (typeof value === 'number') {
    return { kind: 'primitive', type: 'number' };
  }

  if (typeof value === 'boolean') {
    return { kind: 'primitive', type: 'boolean' };
  }

  if (Array.isArray(value)) {
    return inferArrayType(value);
  }

  if (typeof value === 'object') {
    return inferObjectType(value as Record<string, unknown>);
  }

  return { kind: 'primitive', type: 'string' };
}

function inferArrayType(arr: unknown[]): ArrayType {
  if (arr.length === 0) {
    return {
      kind: 'array',
      elementType: { kind: 'primitive', type: 'unknown' } as ASTType
    };
  }

  const allObjects = arr.every(item => 
    typeof item === 'object' && item !== null && !Array.isArray(item)
  );

  if (allObjects && arr.length > 1) {
    const allKeys = new Set<string>();
    const objects = arr as Record<string, unknown>[];
    
    for (const obj of objects) {
      for (const key of Object.keys(obj)) {
        allKeys.add(key);
      }
    }

    const mergedProperties = new Map();

    for (const key of allKeys) {
      const values: unknown[] = [];
      let presentCount = 0;

      for (const obj of objects) {
        if (key in obj) {
          values.push(obj[key]);
          presentCount++;
        }
      }

      const isOptional = presentCount < objects.length;
      const mergedType = inferFromValues(values);

      mergedProperties.set(key, {
        type: mergedType,
        optional: isOptional
      });
    }

    return {
      kind: 'array',
      elementType: {
        kind: 'object',
        properties: mergedProperties
      }
    };
  }

  const elementTypes = arr.map(inferType);
  const mergedType = mergeTypes(elementTypes);

  return {
    kind: 'array',
    elementType: mergedType
  };
}

function inferFromValues(values: unknown[]): ASTType {
  if (values.length === 0) {
    return { kind: 'primitive', type: 'string' };
  }

  if (values.length === 1) {
    return inferType(values[0]);
  }

  const uniqueValues = Array.from(new Set(values.map(v => JSON.stringify(v))));
  
  if (uniqueValues.length === 1) {
    const value = values[0];
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null) {
      return { kind: 'literal', value };
    }
  }

  const allStrings = values.every(v => typeof v === 'string');
  if (allStrings && uniqueValues.length <= 10 && uniqueValues.length > 1) {
    return {
      kind: 'enum',
      values: Array.from(new Set(values as string[]))
    };
  }

  const types = values.map(inferType);
  const uniqueTypes = deduplicateTypes(types);

  if (uniqueTypes.length === 1) {
    return uniqueTypes[0];
  }

  return {
    kind: 'union',
    types: uniqueTypes
  };
}

function inferObjectType(obj: Record<string, unknown>): ObjectType {
  const properties = new Map();

  for (const [key, value] of Object.entries(obj)) {
    properties.set(key, {
      type: inferType(value),
      optional: false
    });
  }

  return {
    kind: 'object',
    properties
  };
}

function mergeTypes(types: ASTType[]): ASTType {
  if (types.length === 0) {
    return { kind: 'primitive', type: 'string' };
  }

  if (types.length === 1) {
    return types[0];
  }

  const uniqueTypes = deduplicateTypes(types);

  if (uniqueTypes.length === 1) {
    return uniqueTypes[0];
  }

  return {
    kind: 'union',
    types: uniqueTypes
  };
}

function deduplicateTypes(types: ASTType[]): ASTType[] {
  const seen = new Set<string>();
  const result: ASTType[] = [];

  for (const type of types) {
    const key = typeToKey(type);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(type);
    }
  }

  return result;
}

function typeToKey(type: ASTType): string {
  if (type.kind === 'primitive') {
    return `primitive:${type.type}`;
  }
  if (type.kind === 'literal') {
    return `literal:${JSON.stringify(type.value)}`;
  }
  if (type.kind === 'array') {
    return `array:${typeToKey(type.elementType)}`;
  }
  if (type.kind === 'object') {
    const keys = Array.from(type.properties.keys()).sort();
    return `object:${keys.join(',')}`;
  }
  if (type.kind === 'union') {
    return `union:${type.types.map(typeToKey).join('|')}`;
  }
  if (type.kind === 'enum') {
    return `enum:${type.values.join(',')}`;
  }
  return 'unknown';
}
