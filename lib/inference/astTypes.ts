export type ASTType =
  | PrimitiveType
  | LiteralType
  | ArrayType
  | ObjectType
  | UnionType
  | EnumType;

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
