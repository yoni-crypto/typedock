import ts from 'typescript';
import type { ASTType, ObjectType } from '../inference/astTypes';

export function parseTypescriptToAST(code: string): { success: true; ast: ASTType; name: string } | { success: false; error: string } {
  try {
    const sourceFile = ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true);
    
    let interfaceNode: ts.InterfaceDeclaration | undefined;
    let typeAliasNode: ts.TypeAliasDeclaration | undefined;
    let enumNode: ts.EnumDeclaration | undefined;
    
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isInterfaceDeclaration(node)) {
        interfaceNode = node;
      } else if (ts.isTypeAliasDeclaration(node)) {
        typeAliasNode = node;
      } else if (ts.isEnumDeclaration(node)) {
        enumNode = node;
      }
    });
    
    if (interfaceNode) {
      const name = interfaceNode.name.text;
      const ast = parseTypeNode(interfaceNode);
      return { success: true, ast, name };
    }
    
    if (typeAliasNode) {
      const name = typeAliasNode.name.text;
      const ast = parseTypeNode(typeAliasNode.type);
      return { success: true, ast, name };
    }
    
    if (enumNode) {
      const name = enumNode.name.text;
      const values: string[] = [];
      for (const member of enumNode.members) {
        values.push(member.name.getText());
      }
      return { success: true, ast: { kind: 'enum', values }, name };
    }
    
    return { success: false, error: 'No interface, type alias, or enum found' };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Parse error' };
  }
}

function parseTypeNode(node: ts.Node): ASTType {
  if (ts.isInterfaceDeclaration(node)) {
    return parseInterfaceDeclaration(node);
  }
  
  if (ts.isTypeLiteralNode(node)) {
    return parseTypeLiteral(node);
  }
  
  if (ts.isArrayTypeNode(node)) {
    return {
      kind: 'array',
      elementType: parseTypeNode(node.elementType)
    };
  }
  
  if (ts.isTupleTypeNode(node)) {
    return {
      kind: 'tuple',
      elements: node.elements.map(el => {
        if (ts.isOptionalTypeNode(el)) {
          return { type: parseTypeNode(el.type), optional: true };
        }
        return { type: parseTypeNode(el), optional: false };
      })
    };
  }
  
  if (ts.isUnionTypeNode(node)) {
    return {
      kind: 'union',
      types: node.types.map(parseTypeNode)
    };
  }
  
  if (ts.isIntersectionTypeNode(node)) {
    return {
      kind: 'intersection',
      types: node.types.map(parseTypeNode)
    };
  }
  
  if (ts.isTypeReferenceNode(node)) {
    const typeName = node.typeName.getText();
    
    // Handle Record<K, V>
    if (typeName === 'Record' && node.typeArguments && node.typeArguments.length === 2) {
      return {
        kind: 'record',
        keyType: parseTypeNode(node.typeArguments[0]),
        valueType: parseTypeNode(node.typeArguments[1])
      };
    }
    
    // Handle other type references
    return { kind: 'reference', name: typeName };
  }
  
  if (ts.isLiteralTypeNode(node)) {
    const literal = node.literal;
    if (ts.isStringLiteral(literal)) {
      return { kind: 'literal', value: literal.text };
    }
    if (ts.isNumericLiteral(literal)) {
      return { kind: 'literal', value: Number(literal.text) };
    }
    if (literal.kind === ts.SyntaxKind.TrueKeyword) {
      return { kind: 'literal', value: true };
    }
    if (literal.kind === ts.SyntaxKind.FalseKeyword) {
      return { kind: 'literal', value: false };
    }
    if (literal.kind === ts.SyntaxKind.NullKeyword) {
      return { kind: 'primitive', type: 'null' };
    }
  }
  
  if (ts.isToken(node)) {
    switch (node.kind) {
      case ts.SyntaxKind.StringKeyword:
        return { kind: 'primitive', type: 'string' };
      case ts.SyntaxKind.NumberKeyword:
        return { kind: 'primitive', type: 'number' };
      case ts.SyntaxKind.BooleanKeyword:
        return { kind: 'primitive', type: 'boolean' };
      case ts.SyntaxKind.NullKeyword:
        return { kind: 'primitive', type: 'null' };
      case ts.SyntaxKind.UndefinedKeyword:
        return { kind: 'primitive', type: 'null' };
    }
  }
  
  return { kind: 'primitive', type: 'unknown' };
}

function parseInterfaceDeclaration(node: ts.InterfaceDeclaration): ObjectType {
  const properties = new Map();
  let indexSignature: { keyType: 'string' | 'number'; valueType: ASTType } | undefined;
  
  for (const member of node.members) {
    if (ts.isPropertySignature(member) && member.name) {
      const name = member.name.getText();
      const optional = !!member.questionToken;
      const type = member.type ? parseTypeNode(member.type) : { kind: 'primitive' as const, type: 'unknown' as const };
      
      properties.set(name, { type, optional });
    } else if (ts.isIndexSignatureDeclaration(member)) {
      const keyType = member.parameters[0]?.type;
      const valueType = member.type;
      
      if (keyType && valueType) {
        const keyTypeStr = keyType.getText();
        indexSignature = {
          keyType: keyTypeStr === 'number' ? 'number' : 'string',
          valueType: parseTypeNode(valueType)
        };
      }
    }
  }
  
  return { kind: 'object', properties, indexSignature };
}

function parseTypeLiteral(node: ts.TypeLiteralNode): ObjectType {
  const properties = new Map();
  let indexSignature: { keyType: 'string' | 'number'; valueType: ASTType } | undefined;
  
  for (const member of node.members) {
    if (ts.isPropertySignature(member) && member.name) {
      const name = member.name.getText();
      const optional = !!member.questionToken;
      const type = member.type ? parseTypeNode(member.type) : { kind: 'primitive' as const, type: 'unknown' as const };
      
      properties.set(name, { type, optional });
    } else if (ts.isIndexSignatureDeclaration(member)) {
      const keyType = member.parameters[0]?.type;
      const valueType = member.type;
      
      if (keyType && valueType) {
        const keyTypeStr = keyType.getText();
        indexSignature = {
          keyType: keyTypeStr === 'number' ? 'number' : 'string',
          valueType: parseTypeNode(valueType)
        };
      }
    }
  }
  
  return { kind: 'object', properties, indexSignature };
}
