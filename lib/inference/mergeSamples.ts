import type { ASTType, ObjectType, PropertyType } from './astTypes';
import { inferType } from './inferTypes';

export function mergeSamples(samples: unknown[]): ASTType {
  if (samples.length === 0) {
    return { kind: 'object', properties: new Map() };
  }

  if (samples.length === 1) {
    return inferType(samples[0]);
  }

  const types = samples.map(inferType);
  return mergeASTTypes(types);
}

function mergeASTTypes(types: ASTType[]): ASTType {
  if (types.length === 0) {
    return { kind: 'object', properties: new Map() };
  }

  if (types.length === 1) {
    return types[0];
  }

  const allObjects = types.every(t => t.kind === 'object');
  
  if (allObjects) {
    return mergeObjectTypes(types as ObjectType[]);
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

function mergeObjectTypes(objects: ObjectType[]): ObjectType {
  const allKeys = new Set<string>();
  
  for (const obj of objects) {
    for (const key of obj.properties.keys()) {
      allKeys.add(key);
    }
  }

  const mergedProperties = new Map<string, PropertyType>();

  for (const key of allKeys) {
    const propertyTypes: ASTType[] = [];
    const values: unknown[] = [];
    let presentCount = 0;

    for (const obj of objects) {
      const prop = obj.properties.get(key);
      if (prop) {
        propertyTypes.push(prop.type);
        presentCount++;
      }
    }

    const isOptional = presentCount < objects.length;
    const mergedType = mergePropertyTypes(propertyTypes, values);

    mergedProperties.set(key, {
      type: mergedType,
      optional: isOptional
    });
  }

  return {
    kind: 'object',
    properties: mergedProperties
  };
}

function mergePropertyTypes(types: ASTType[], values: unknown[]): ASTType {
  if (types.length === 0) {
    return { kind: 'primitive', type: 'string' };
  }

  if (types.length === 1) {
    return types[0];
  }

  const allPrimitives = types.every(t => t.kind === 'primitive');
  
  if (allPrimitives) {
    const primitiveTypes = types as Array<{ kind: 'primitive'; type: string }>;
    const uniquePrimitiveTypes = new Set(primitiveTypes.map(t => t.type));
    
    if (uniquePrimitiveTypes.size === 1) {
      return types[0];
    }
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
  if (type.kind === 'tuple') {
    return `tuple:${type.elements.map(e => typeToKey(e.type)).join(',')}`;
  }
  if (type.kind === 'record') {
    return `record:${typeToKey(type.keyType)}:${typeToKey(type.valueType)}`;
  }
  if (type.kind === 'intersection') {
    return `intersection:${type.types.map(typeToKey).join('&')}`;
  }
  if (type.kind === 'reference') {
    return `reference:${type.name}`;
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

export function detectLiteralsAndEnums(samples: unknown[]): ASTType {
  if (samples.length === 0) {
    return { kind: 'object', properties: new Map() };
  }

  if (samples.length === 1) {
    const sample = samples[0];
    if (Array.isArray(sample)) {
      return inferType(sample);
    }
    return inferType(sample);
  }

  const allArrays = samples.every(s => Array.isArray(s));
  
  if (allArrays) {
    const flattenedItems = (samples as unknown[][]).flat();
    const allObjects = flattenedItems.every(item => 
      typeof item === 'object' && item !== null && !Array.isArray(item)
    );

    if (allObjects && flattenedItems.length > 0) {
      const objects = flattenedItems as Record<string, unknown>[];
      const allKeys = new Set<string>();
      
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
  }

  const allObjects = samples.every(s => typeof s === 'object' && s !== null && !Array.isArray(s));
  
  if (!allObjects) {
    return mergeSamples(samples);
  }

  const objects = samples as Record<string, unknown>[];
  const allKeys = new Set<string>();
  
  for (const obj of objects) {
    for (const key of Object.keys(obj)) {
      allKeys.add(key);
    }
  }

  const mergedProperties = new Map<string, PropertyType>();

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
    kind: 'object',
    properties: mergedProperties
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
