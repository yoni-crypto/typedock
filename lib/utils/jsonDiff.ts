export interface DiffResult {
  added: DiffItem[];
  removed: DiffItem[];
  changed: DiffItem[];
}

export interface DiffItem {
  path: string;
  oldValue?: unknown;
  newValue?: unknown;
}

export function diffJson(oldJson: string, newJson: string): DiffResult | { error: string } {
  try {
    const oldObj = JSON.parse(oldJson);
    const newObj = JSON.parse(newJson);
    
    const added: DiffItem[] = [];
    const removed: DiffItem[] = [];
    const changed: DiffItem[] = [];
    
    // Find added and changed
    findDifferences(newObj, oldObj, '', added, changed, 'new');
    
    // Find removed
    findDifferences(oldObj, newObj, '', removed, [], 'old');
    
    return { added, removed, changed };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Invalid JSON' };
  }
}

function findDifferences(
  obj: any,
  compareObj: any,
  path: string,
  addedList: DiffItem[],
  changedList: DiffItem[],
  mode: 'new' | 'old'
): void {
  if (obj === null || typeof obj !== 'object') {
    return;
  }
  
  if (Array.isArray(obj)) {
    if (!Array.isArray(compareObj)) {
      if (mode === 'new') {
        changedList.push({ path, oldValue: compareObj, newValue: obj });
      }
      return;
    }
    
    for (let i = 0; i < obj.length; i++) {
      const itemPath = `${path}[${i}]`;
      if (i >= compareObj.length) {
        if (mode === 'new') {
          addedList.push({ path: itemPath, newValue: obj[i] });
        }
      } else if (JSON.stringify(obj[i]) !== JSON.stringify(compareObj[i])) {
        if (typeof obj[i] === 'object' && obj[i] !== null) {
          findDifferences(obj[i], compareObj[i], itemPath, addedList, changedList, mode);
        } else if (mode === 'new') {
          changedList.push({ path: itemPath, oldValue: compareObj[i], newValue: obj[i] });
        }
      }
    }
    return;
  }
  
  for (const key in obj) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (!(key in compareObj)) {
      if (mode === 'new') {
        addedList.push({ path: currentPath, newValue: obj[key] });
      } else {
        addedList.push({ path: currentPath, oldValue: obj[key] });
      }
    } else if (JSON.stringify(obj[key]) !== JSON.stringify(compareObj[key])) {
      if (typeof obj[key] === 'object' && obj[key] !== null && typeof compareObj[key] === 'object' && compareObj[key] !== null) {
        findDifferences(obj[key], compareObj[key], currentPath, addedList, changedList, mode);
      } else if (mode === 'new') {
        changedList.push({ path: currentPath, oldValue: compareObj[key], newValue: obj[key] });
      }
    }
  }
}
