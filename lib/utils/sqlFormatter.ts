import { format } from 'sql-formatter';

export interface FormatOptions {
  language: 'sql' | 'mysql' | 'postgresql' | 'plsql' | 'bigquery' | 'db2' | 'sqlite';
  tabWidth: number;
  keywordCase: 'upper' | 'lower' | 'preserve';
  indentStyle: 'standard' | 'tabularLeft' | 'tabularRight';
  linesBetweenQueries: number;
  denseOperators: boolean;
  newlineBeforeSemicolon: boolean;
}

const defaultOptions: FormatOptions = {
  language: 'sql',
  tabWidth: 2,
  keywordCase: 'upper',
  indentStyle: 'standard',
  linesBetweenQueries: 2,
  denseOperators: false,
  newlineBeforeSemicolon: false,
};

export function formatSql(sql: string, options: Partial<FormatOptions> = {}): string {
  if (!sql.trim()) return '';
  
  try {
    const mergedOptions = { ...defaultOptions, ...options };
    return format(sql, {
      language: mergedOptions.language,
      tabWidth: mergedOptions.tabWidth,
      keywordCase: mergedOptions.keywordCase,
      indentStyle: mergedOptions.indentStyle,
      linesBetweenQueries: mergedOptions.linesBetweenQueries,
      denseOperators: mergedOptions.denseOperators,
      newlineBeforeSemicolon: mergedOptions.newlineBeforeSemicolon,
    });
  } catch (error) {
    return `Error formatting SQL: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

export function minifySql(sql: string): string {
  if (!sql.trim()) return '';
  
  try {
    return format(sql, {
      language: 'sql',
      tabWidth: 0,
      keywordCase: 'upper',
      indentStyle: 'standard',
      linesBetweenQueries: 0,
    }).replace(/\n\s*\n/g, ' ').trim();
  } catch (error) {
    return `Error minifying SQL: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

export function validateSql(sql: string): { valid: boolean; error?: string } {
  if (!sql.trim()) {
    return { valid: false, error: 'Empty SQL query' };
  }
  
  try {
    format(sql, { language: 'sql' });
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Invalid SQL syntax' 
    };
  }
}

export const supportedDialects = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'plsql', label: 'PL/SQL' },
  { value: 'bigquery', label: 'BigQuery' },
  { value: 'db2', label: 'DB2' },
  { value: 'sqlite', label: 'SQLite' },
];
