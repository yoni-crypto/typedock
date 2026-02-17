export type ASTType =
  | PrimitiveType
  | LiteralType
  | ArrayType
  | ObjectType
  | UnionType
  | EnumType
  | TupleType
  | RecordType
  | IntersectionType
  | ReferenceType;

export interface PrimitiveType {
  kind: 'primitive';
  type: 'string' | 'number' | 'boolean' | 'null' | 'unknown';
}

export interface LiteralType {
  kind: 'literal';
  value: string | number | boolean | null;
}

export interface ArrayType {
  kind: 'array';
  elementType: ASTType;
}

export interface ObjectType {
  kind: 'object';
  properties: Map<string, PropertyType>;
  indexSignature?: { keyType: 'string' | 'number'; valueType: ASTType };
}

export interface PropertyType {
  type: ASTType;
  optional: boolean;
}

export interface UnionType {
  kind: 'union';
  types: ASTType[];
}

export interface EnumType {
  kind: 'enum';
  values: string[];
}

export interface TupleType {
  kind: 'tuple';
  elements: { type: ASTType; optional: boolean }[];
}

export interface RecordType {
  kind: 'record';
  keyType: ASTType;
  valueType: ASTType;
}

export interface IntersectionType {
  kind: 'intersection';
  types: ASTType[];
}

export interface ReferenceType {
  kind: 'reference';
  name: string;
}
