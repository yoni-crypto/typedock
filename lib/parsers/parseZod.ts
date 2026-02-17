export function generateTypeFromZod(zodCode: string, typeName: string = 'Data'): string {
  // Extract schema variable name
  const schemaMatch = zodCode.match(/(?:export\s+)?const\s+(\w+)\s*=/);
  const schemaName = schemaMatch ? schemaMatch[1] : 'schema';
  
  // Generate the inferred type
  const lines: string[] = [];
  
  // Include the original schema
  lines.push(zodCode.trim());
  lines.push('');
  
  // Generate z.infer type
  lines.push(`export type ${typeName} = z.infer<typeof ${schemaName}>;`);
  
  return lines.join('\n');
}
