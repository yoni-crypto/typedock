import { z } from 'zod';

export interface ValidationResult {
  success: boolean;
  data?: unknown;
  errors?: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  code: string;
}

export function validateWithZod(jsonData: string, zodSchema: string): ValidationResult {
  try {
    // Parse JSON
    const data = JSON.parse(jsonData);
    
    // Create schema from code
    const schema = createSchemaFromCode(zodSchema);
    
    if (!schema) {
      return {
        success: false,
        errors: [{ 
          path: 'schema', 
          message: 'Could not parse Zod schema. Make sure to define: const schema = z.object({...})', 
          code: 'invalid_schema' 
        }]
      };
    }
    
    // Validate
    const result = schema.safeParse(data);
    
    if (result.success) {
      return { success: true, data: result.data };
    }
    
    // Format errors
    const errors: ValidationError[] = result.error.issues.map(issue => ({
      path: issue.path.length ? issue.path.join('.') : '(root)',
      message: issue.message,
      code: issue.code
    }));
    
    return { success: false, errors };
  } catch (err) {
    return {
      success: false,
      errors: [{ 
        path: '(root)', 
        message: err instanceof Error ? err.message : 'Validation failed',
        code: 'execution_error'
      }]
    };
  }
}

function createSchemaFromCode(code: string): z.ZodTypeAny | null {
  try {
    const fn = new Function('z', `
      "use strict";
      ${code}
      
      // Try common schema variable names
      if (typeof schema !== "undefined") return schema;
      if (typeof Schema !== "undefined") return Schema;
      if (typeof DataSchema !== "undefined") return DataSchema;
      
      throw new Error("No schema variable found. Define: const schema = z.object({...})");
    `);
    
    let result;
    try {
      result = fn(z);
    } catch (execError) {
      // User code threw an error during execution - silently return null
      return null;
    }
    
    // Verify it's actually a Zod schema
    if (!result || typeof result.safeParse !== 'function') {
      return null;
    }
    
    return result;
  } catch (err) {
    // Function creation error - silently return null
    return null;
  }
}
