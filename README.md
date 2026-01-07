# Task Management Application

A Next.js-based task management application built with TypeScript, HeroUI, and modern React patterns.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Standards

### Code Quality Commands

- `npm run dev` - Start development server with environment variables
- `npm run check` - Run typecheck, lint, and format check together
- `npm run typecheck` - TypeScript type checking
- `npm run lint` - ESLint with strict custom rules
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format:check` - Prettier format checking
- `npm run format:fix` - Auto-fix formatting
- `npm test` - Run Jest tests (timezone: Australia/Sydney)
- `npm test:watch` - Run tests in watch mode

*This project follows strict code quality standards. Always run `npm run check` before committing to ensure your code meets all requirements.*

### Technology Stack

- **Next.js 15** with TypeScript and static export
- **React 18** with hooks-based functional components
- **Jotai** for atomic state management
- **TanStack Query v5** for server state management
- **HeroUI** component library with custom wrappers
- **Formik + Yup** for form handling
- **Jest + React Testing Library** for testing

### Project Structure

#### `/src/common/` - Shared Application Layer
- `/api/` - TanStack Query hooks organized by domain
- `/atoms/` - Jotai atomic state definitions
- `/components/` - Reusable UI components with co-location pattern
- `/hooks/` - Custom React hooks for business logic
- `/libraries/` - Utility functions and helpers
- `/ui/` - Base design system components and primitives

#### `/src/modules/` - Feature Modules
Domain-driven organization with self-contained modules. Each module can have:
- `/components/` - Module-specific components
- `/libraries/` - Module-specific utilities
- `/enums/` - Module-specific constants
- `/types/` - Module-specific TypeScript types
- `/hooks/` - Module-specific React hooks

All subfolders must export via `index.ts` files.

#### `/src/pages/` - Next.js File-based Routing
Standard Next.js structure with dynamic routes.

### Development Guidelines

#### Component Architecture
- **Co-location pattern**: Each component folder contains main file, `index.ts`, tests, and sub-components
- **Wrapper pattern**: Always use custom UI component wrappers, never import directly from HeroUI
- **Module structure**: Each module exports one component defined in a file matching the folder name

#### State Management
- **Jotai**: Atomic state pattern with fine-grained reactivity
- **TanStack Query**: Query hooks for all server interactions with domain-specific organization

#### Code Style
- Use `type` for type definitions, not `interface`
- Use `Box` component instead of `div`/`span`
- Use `Typography` component instead of text tags
- Typography and Button components must have an `id` prop
- Use numeric separators for large numbers (e.g., `12_000`)
- Import from subfolder index files, not individual files directly

#### Testing
- **Co-located tests** in `__tests__` folder at the same level as the file they're testing
- **Setup function**: Always use a `setup()` function for test configuration
- **API mocking**: Mock API hooks using Jest with proper return values
- **No component mocking**: Test real components, not mocked versions
- Use `toBeInTheDocument()` for DOM presence, `toBeVisible()` for visual state

#### Naming Conventions
- Components: PascalCase
- Variables/functions: camelCase
- Types: PascalCase (no "I" prefix)
- IDs and test-ids: `{scope}--{context}` format with double hyphens

### Import Guidelines

**Correct import patterns:**
```typescript
// ✅ From subfolder index files
import { createValidationSchema } from './libraries'
import { MobileNumberValidationRegex } from 'common/libraries'

// ✅ UI component wrappers
import { Button, Typography } from 'common/ui'
```

**Incorrect patterns:**
```typescript
// ❌ Direct file imports
import { createValidationSchema } from './libraries/validation'

// ❌ Direct HeroUI imports
import { Button } from '@heroui/react'
```

### Form Handling
- **Formik + Yup** for form validation and submission
- **Field components**: Use custom Input/Textarea components from `common/components/FormFields`
- **Error handling**: Display validation errors via component props
