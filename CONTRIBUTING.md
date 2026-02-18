# Contributing to TypeDock

Thank you for considering contributing to TypeDock.

## Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. Check if the bug already exists in Issues
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information

### Suggesting Features

1. Check if the feature already exists in Issues
2. Create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/typedock.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Code Style

- Use TypeScript
- Follow existing code patterns
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable names

## Adding a New Tool

### 1. Create Tool Directory

```bash
mkdir -p app/[tool-name]
```

### 2. Create page.tsx

```typescript
'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

export default function ToolPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <SplitLayout
      left={/* Input UI */}
      right={/* Output UI */}
    />
  );
}
```

### 3. Create layout.tsx

```typescript
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Tool Name - Description',
  description: 'Detailed description for SEO',
  path: '/tool-name',
  keywords: ['keyword1', 'keyword2'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

### 4. Create Utility Function

```typescript
// lib/utils/toolName.ts
export function convertTool(input: string): string {
  // Implementation
  return output;
}
```

### 5. Update Homepage

Add tool to `app/page.tsx` tools array.

### 6. Update Sidebar

Add tool to `components/layout/SplitLayout.tsx` toolGroups.

### 7. Update Metadata

Add tool metadata to `lib/seo/toolsMetadata.ts`.

## Testing

- Test in Chrome, Firefox, Safari
- Test light and dark modes
- Test keyboard shortcuts
- Test with various inputs
- Test edge cases

## Commit Messages

Use clear, descriptive commit messages:

```
Add JSON to XML converter
Fix dark mode input visibility
Update README with new tool
```

## Questions

Open an issue or discussion on GitHub.
