export function yamlToJson(yaml: string): { success: boolean; output?: string; error?: string } {
  try {
    const obj = parseYaml(yaml);
    return { success: true, output: JSON.stringify(obj, null, 2) };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to parse YAML' };
  }
}

function parseYaml(yaml: string): any {
  const lines = yaml.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
  const result: any = {};
  const stack: any[] = [{ indent: -1, obj: result }];

  for (const line of lines) {
    const indent = line.search(/\S/);
    const trimmed = line.trim();

    if (trimmed.startsWith('-')) {
      const value = trimmed.substring(1).trim();
      const parent = stack[stack.length - 1];
      
      if (!Array.isArray(parent.obj)) {
        const arr: any[] = [];
        const key = parent.key;
        if (key) {
          parent.parent[key] = arr;
          parent.obj = arr;
        }
      }
      
      if (value.includes(':')) {
        const obj: any = {};
        parent.obj.push(obj);
        const [k, v] = value.split(':').map(s => s.trim());
        obj[k] = parseValue(v);
      } else {
        parent.obj.push(parseValue(value));
      }
      continue;
    }

    if (!trimmed.includes(':')) continue;

    const [key, ...valueParts] = trimmed.split(':');
    const value = valueParts.join(':').trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;

    if (value) {
      parent[key] = parseValue(value);
    } else {
      parent[key] = {};
      stack.push({ indent, obj: parent[key], key, parent });
    }
  }

  return result;
}

function parseValue(value: string): any {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (!isNaN(Number(value))) return Number(value);
  return value.replace(/^["']|["']$/g, '');
}

export function jsonToYaml(json: string): { success: boolean; output?: string; error?: string } {
  try {
    const obj = JSON.parse(json);
    const yaml = objectToYaml(obj, 0);
    return { success: true, output: yaml };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to convert to YAML' };
  }
}

function objectToYaml(obj: any, indent: number): string {
  const spaces = '  '.repeat(indent);
  let yaml = '';

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        yaml += `${spaces}-\n${objectToYaml(item, indent + 1)}`;
      } else {
        yaml += `${spaces}- ${item}\n`;
      }
    }
    return yaml;
  }

  for (const key in obj) {
    const value = obj[key];
    
    if (typeof value === 'object' && value !== null) {
      yaml += `${spaces}${key}:\n${objectToYaml(value, indent + 1)}`;
    } else {
      yaml += `${spaces}${key}: ${value}\n`;
    }
  }

  return yaml;
}
