# TypeDock

A fast, zero-login, fully client-side developer tool for converting JSON into TypeScript interfaces, Zod schemas, and runtime validation functions.

## Philosophy

TypeDock is built for developers who need accurate, deterministic type generation without the overhead of AI, authentication, or server round-trips. Every transformation happens instantly in your browser.

## Features

### Smart Type Inference
- Recursive type detection (primitives, arrays, nested objects)
- Multi-sample merging for optional field detection
- Union type inference from varying field types
- Literal type detection for constants
- Enum inference from repeated string values
- Zero `any` types

### Three Output Modes
1. **TypeScript Interface** - Clean, idiomatic interfaces
2. **Zod Schema** - Runtime validation with full type safety
3. **Combined** - Interface + Schema + parse function

### Developer Experience
- Monaco editor with syntax highlighting
- Real-time parsing (200ms debounce)
- Clear error messages
- One-click copy to clipboard
- Dark mode optimized
- No distractions

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- Monaco Editor
- 100% client-side

## Architecture

```
/app
  /json-to-typescript    # TypeScript interface generator
  /json-to-zod          # Zod schema generator
  layout.tsx            # Root layout
  page.tsx              # Landing page

/lib
  /inference
    inferTypes.ts       # Core type inference engine
    mergeSamples.ts     # Multi-sample merging logic
    astTypes.ts         # AST type definitions
  
  /generators
    generateTypescript.ts  # TS interface generator
    generateZod.ts         # Zod schema generator
  
  /utils
    parseJson.ts        # JSON parsing utilities
    formatCode.ts       # Code formatting helpers

/components
  /editor
    JsonEditor.tsx      # Monaco JSON input
    CodeOutput.tsx      # Monaco code output
  
  /ui
    SplitLayout.tsx     # Split pane layout
    CopyButton.tsx      # Copy to clipboard
    ErrorDisplay.tsx    # Error messages
```

## Design Principles

### Code Quality
- Strict TypeScript, no `any`
- AST-based generation (no string concatenation)
- Separation of concerns
- Reusable inference engine
- Minimal, readable code

### Performance
- Client-side only
- Efficient recursion
- Debounced parsing
- Handles large JSON objects

### Extensibility
Architecture prepared for:
- OpenAPI import
- GraphQL schema support
- Additional output formats
- VSCode extension

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Routes

- `/json-to-typescript` - JSON to TypeScript converter
- `/json-to-zod` - JSON to Zod converter

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run linter
```

## Project Status

TypeDock is in active development. The goal is to create a production-ready tool that competes with existing JSON-to-TypeScript generators through superior accuracy, performance, and developer experience.
