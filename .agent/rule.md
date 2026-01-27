# Monorepo Development Rules & Standards (Ultimate Guide)

## 1. Architecture & Monorepo Alignment

- **Workspace Pattern**: All apps (`blog`, `home`, `tool`) must follow the unified workspace structure.
- **Shared Packages**:
  - `packages/components`: Single source of truth for UI. Use `@origini/components`.
  - `packages/config`: Shared app/ui configurations. Use `@origini/config`.
  - `packages/libs`: Shared utilities (cn, etc.). Use `@origini/libs`.
- **Configuration Consistency**:
  - `next.config.js`: Use CommonJS `module.exports = config` to ensure compatibility with Turbopack and the build pipeline (same as `blog` and `home`).
  - `tailwind.config.mjs`: Extend the shared `@origini/tailwind-config`.
  - `tsconfig.json`: Extend `@origini/tsconfig/nextjs.json`.

## 2. SOLID Principles & React Design

- **Single Responsibility (SRP)**:
  - Pages handle data fetching and layout composition.
  - Components handle presentation.
  - Business logic stays in `lib/` or shared packages.
- **Open/Closed**:
  - Use `cn()` and `...props` to allow component styling without modifying internals.
- **Dependency Inversion**:
  - Use configurations from `@origini/config` instead of hardcoding values.
- **Composition over Inheritance**:
  - Nest components (e.g., `NavbarLayout` wrapping `Sidebar` and `main`) for modularity.

## 3. UI-UX Pro Max Standards

- **Design Tokens**:
  - Jade Green: `#10b981` is the primary identity.
  - Surface: Slate 50 (`#f8fafc`) for light surfaces.
  - Contrast: Ensure AA/AAA contrast for accessibility.
- **Animations**:
  - Use `framer-motion` (shared from `@origini/components` or local) for smooth entry/exit.
  - Use Jade Green gradients for "hero" and "premium" elements in dark mode.
- **Naming**:
  - Components: `PascalCase.tsx` (e.g., `NavItem.tsx`).
  - Hooks: `useCamelCase.ts` (e.g., `useSidebar.ts`).
  - Hooks: `useCamelCase.ts` (e.g., `useSidebar.ts`).
  - Directories: lowercase-kebab-case.
- **Hook Reuse**:
  - ALWAYS check for existing hooks in `lib/hooks` before implementing logic manually (e.g., `useDownload`).
  - Code reuse is a priority over rewriting common logic.

## 4. Run & Project Execution

- **File Deletion**:
  - **CRITICAL**: BEFORE deleting any file or directory, you MUST ask the user for permission.
  - Exception: Temporary files you created in the same session.
- **Commands**:
  - Start app: `yarn dev --filter=tool` (Must use Turbopack).
  - Build app: `yarn build --filter=tool`.
- **Environment**:
  - Shared `.env` at root, local `.env` only for overrides.
- **Cache Management**:
  - If fonts or variables fail, clear caches: `rm -rf .next .turbo`.

## 5. Reusability & Standards

- **Component Redundancy**: NEVER create a local component if a shared one exists in `@origini/components`.
- **Prop Standard**: Interactive components should accept `className` and `onClick`.
- **Logic First Principle**:
  - ALWAYS analyze and fully understand the underlying mechanism and architecture before implementing a feature.
  - Avoid "over-engineering" or adding redundant client-side logic (e.g., client-side pagination for static data) that doesn't provide real technical benefits based on the system's current architecture (Frontend-only vs Backend-integrated).
  - Question the NECESSITY of a feature's complexity relative to how the data is being fetched and processed.
  - Standard fonts: `Inter` (sans), `Libre Baskerville` (serif).
  - Subsets: Use `['latin', 'vietnamese']` for Inter and `['latin', 'latin-ext']` for Serif to match `blog`.
  - Literal weights: Always provide weights as an array of strings.

## 6. Pre-Completion Safety Checks (MANDATORY)

- **Linting Verification**:
  - BEFORE marking any task as complete or requesting user review, checking for syntax errors is MANDATORY.
  - Run `yarn lint --filter=<app-name>` or verify there are no red squiggles/errors in the IDE feedback for modified files.
  - **Zero Error Policy**: Ensure no build-breaking TypeScript errors or ESLint errors remain in the changed files.
