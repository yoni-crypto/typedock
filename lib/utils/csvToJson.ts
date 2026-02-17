export function csvToJson(csv: string): { success: boolean; output?: string; error?: string } {
  try {
    const lines = csv.trim().split('\n');
    if (lines.length === 0) {
      return { success: false, error: 'Empty CSV input' };
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const obj: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      
      result.push(obj);
    }

    return { success: true, output: JSON.stringify(result, null, 2) };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to parse CSV' };
  }
}
