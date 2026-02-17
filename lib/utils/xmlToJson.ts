export function xmlToJson(xml: string): { success: boolean; output?: string; error?: string } {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
      return { success: false, error: 'Invalid XML format' };
    }

    const result = xmlNodeToJson(doc.documentElement);
    return { success: true, output: JSON.stringify(result, null, 2) };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to parse XML' };
  }
}

function xmlNodeToJson(node: Element): any {
  const obj: any = {};

  // Add attributes
  if (node.attributes.length > 0) {
    obj['@attributes'] = {};
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      obj['@attributes'][attr.name] = attr.value;
    }
  }

  // Add child nodes
  if (node.children.length === 0) {
    return node.textContent || '';
  }

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const childName = child.nodeName;
    const childValue = xmlNodeToJson(child);

    if (obj[childName]) {
      if (!Array.isArray(obj[childName])) {
        obj[childName] = [obj[childName]];
      }
      obj[childName].push(childValue);
    } else {
      obj[childName] = childValue;
    }
  }

  return obj;
}

export function jsonToXml(json: string): { success: boolean; output?: string; error?: string } {
  try {
    const obj = JSON.parse(json);
    const xml = jsonObjectToXml(obj, 'root');
    return { success: true, output: `<?xml version="1.0" encoding="UTF-8"?>\n${xml}` };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to convert to XML' };
  }
}

function jsonObjectToXml(obj: any, nodeName: string): string {
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    return `<${nodeName}>${obj}</${nodeName}>`;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => jsonObjectToXml(item, nodeName)).join('\n');
  }

  let xml = `<${nodeName}`;
  let content = '';

  for (const key in obj) {
    if (key === '@attributes') {
      for (const attr in obj[key]) {
        xml += ` ${attr}="${obj[key][attr]}"`;
      }
    } else {
      content += jsonObjectToXml(obj[key], key);
    }
  }

  xml += content ? `>\n${content}\n</${nodeName}>` : '/>';
  return xml;
}
