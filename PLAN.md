# TypeDock Implementation Plan

## Phase 1: Foundation & Type System

### Step 1: Setup TypeScript Configuration
- [x] Enable strict mode
- [ ] Configure path aliases (@/lib, @/components)
- [ ] Add tsconfig paths

### Step 2: Define AST Types
**File:** `/lib/inference/astTypes.ts`

Define the internal type representation:
- PrimitiveType (string, number, boolean, null)
- ArrayType (with element type)
- ObjectType (with properties map)
- UnionType (multiple possible types)
- LiteralType (constant values)
- EnumType (limited string values)
- OptionalType wrapper

### Step 3: Build Type Inference Engine
**File:** `/lib/inference/inferTypes.ts`

Core function: `inferType(value: unknown): ASTType`

Logic:
- Recursively traverse JSON structure
- Detect primitive types
- Handle arrays (infer element types)
- Handle objects (infer property types)
- Return AST representation

### Step 4: Multi-Sample Merging
**File:** `/lib/inference/mergeSamples.ts`

Core function: `mergeSamples(samples: unknown[]): ASTType`

Logic:
- Parse multiple JSON objects
- Merge object properties
- Mark fields as optional if missing in any sample
- Create unions when types differ
- Detect literals when values are constant
- Detect enums from repeated strings

---

## Phase 2: Code Generators

### Step 5: TypeScript Generator
**File:** `/lib/generators/generateTypescript.ts`

Core function: `generateInterface(ast: ASTType, name: string): string`

Logic:
- Convert AST to TypeScript interface syntax
- Handle nested objects recursively
- Format unions with `|`
- Mark optional fields with `?`
- Generate clean, idiomatic TypeScript

### Step 6: Zod Generator
**File:** `/lib/generators/generateZod.ts`

Core function: `generateZodSchema(ast: ASTType, name: string): string`

Logic:
- Convert AST to Zod schema syntax
- Use `z.object()`, `z.array()`, `z.union()`
- Handle `.optional()` for optional fields
- Support `.strict()` mode toggle
- Generate parse function

---

## Phase 3: UI Components

### Step 7: Base UI Components
**Files:**
- `/components/ui/CopyButton.tsx` - Copy to clipboard with feedback
- `/components/ui/ErrorDisplay.tsx` - Clean error messages
- `/components/ui/TabGroup.tsx` - Output tab switcher

Design:
- Minimal, functional
- Dark mode optimized
- No unnecessary animations
- Professional dev tool aesthetic

### Step 8: Editor Components
**Files:**
- `/components/editor/JsonEditor.tsx` - Monaco editor for JSON input
- `/components/editor/CodeOutput.tsx` - Monaco editor for output (read-only)

Features:
- Syntax highlighting
- Error indicators
- Line numbers
- Proper theming

### Step 9: Layout Component
**File:** `/components/layout/SplitLayout.tsx`

Features:
- Responsive split pane (50/50 default)
- Optional resizable divider (future)
- Clean spacing
- Mobile-friendly stack

---

## Phase 4: Pages & Routes

### Step 10: JSON to TypeScript Page
**File:** `/app/json-to-typescript/page.tsx`

Features:
- JsonEditor (left)
- CodeOutput (right)
- Real-time conversion (debounced)
- Error handling
- Copy button

Metadata:
- Title: "JSON to TypeScript - TypeDock"
- Description: "Convert JSON to TypeScript interfaces instantly"

### Step 11: JSON to Zod Page
**File:** `/app/json-to-zod/page.tsx`

Features:
- Same as Step 10, but outputs Zod schema
- Three tabs: Schema only, Interface only, Combined
- Strict mode toggle

Metadata:
- Title: "JSON to Zod - TypeDock"
- Description: "Generate Zod schemas from JSON with runtime validation"

### Step 12: Landing Page
**File:** `/app/page.tsx`

Content:
- Hero section with value proposition
- Feature highlights (3-4 key features)
- Links to /json-to-typescript and /json-to-zod
- Minimal, clean design
- No marketing fluff

---

## Phase 5: Polish & Optimization

### Step 13: Utilities
**Files:**
- `/lib/utils/parseJson.ts` - Safe JSON parsing with error handling
- `/lib/utils/formatCode.ts` - Code formatting helpers
- `/lib/utils/debounce.ts` - Debounce utility

### Step 14: Styling
- Create Tailwind config with custom colors
- Define consistent spacing scale
- Set up dark mode theme
- Create reusable utility classes

### Step 15: Testing & Refinement
- Test with complex nested JSON
- Test with multiple samples
- Test edge cases (empty objects, null values)
- Verify TypeScript output compiles
- Verify Zod schemas validate correctly

---

## Phase 6: Final Touches

### Step 16: SEO & Metadata
- Add proper meta tags to all pages
- Create favicon
- Add Open Graph tags
- Optimize for search

### Step 17: Performance Audit
- Check bundle size
- Optimize Monaco editor loading
- Ensure smooth debouncing
- Test with large JSON files

### Step 18: Documentation
- Add inline examples
- Create usage guide
- Document edge cases
- Add keyboard shortcuts

---

## Implementation Order

**Week 1: Core Engine**
- Steps 1-4: Type system and inference engine

**Week 2: Generators**
- Steps 5-6: Code generation

**Week 3: UI**
- Steps 7-9: Components and layout

**Week 4: Integration**
- Steps 10-12: Pages and routing

**Week 5: Polish**
- Steps 13-18: Utilities, styling, optimization

---

## Success Criteria

- [ ] Handles nested objects 5+ levels deep
- [ ] Correctly infers optional fields from multiple samples
- [ ] Generates valid TypeScript that compiles
- [ ] Generates valid Zod schemas that validate
- [ ] Processes 1000+ line JSON in <500ms
- [ ] Zero runtime errors
- [ ] Clean, maintainable codebase
- [ ] Professional UI that doesn't look AI-generated

---

## Notes

- Keep components under 200 lines
- Keep functions under 50 lines
- No comments unless absolutely necessary
- Prefer composition over complexity
- Test with real-world JSON examples
