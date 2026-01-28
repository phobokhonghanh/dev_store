# Plan: Project-Wide Internationalization (I18n) Refactor for apps/tool

## Goal

Refactor the `apps/tool` project to eliminate hardcoded strings entirely. Move configuration and static data (currently mixed with code) into a structured, locale-aware architecture. Ensure all text content is dynamically loaded based on the selected language (VI/EN).

## Principles

1.  **No Hardcoded Text**: No user-facing strings in components or static data files.
2.  **Separation of Concerns**: Data structure (logic/icons) should be separate from Content (text).
3.  **Locale-Aware Data Generators**: "Static" data files (like routes, social platforms) must become functions that accept a `locale` or `dictionary`.
4.  **Centralized Dictionary**: All text lives in `lib/i18n.ts` (or a split structure if it grows too large).

## Phase 1: Architecture & Data Structure

### 1.1. Refactor `lib/i18n.ts` (The Source of Truth)

Expand the master dictionary to cover all identified hardcoded areas.

- **Add Sections**:
  - `sidebar`: For navigation items (Search, Premium, Free, Countdown, QRCode...).
  - `social`: For social platform names or localized patterns if needed.
  - `pricing`:For pricing cards (plans, features, prices).
  - `hero`: For Hero section titles and subtitles.
  - `breadcrumbs`: For automatic breadcrumb mapping.
  - `meta`: For page metadata (titles, descriptions).

### 1.2. Transform "Static" Data Files

Convert existing static objects into **Factory Functions** that accept the dictionary.

#### A. `lib/tools-routes.ts`

_Current_: Static `NavRoute[]` array with hardcoded `label`, `description`.
_New_:

```typescript
export const getToolsRoutes = (dict: AppDict): NavRoute[] => [
  {
    label: dict.sidebar.search,
    description: dict.sidebar.searchDesc,
    // ... icons and paths remain static
  },
  // ...
]
```

#### B. `lib/social-platforms.ts`

_Current_: Static `SocialPlatform[]` array.
_New_:

```typescript
export const getSocialPlatforms = (dict: AppDict): SocialPlatform[] => [
  // If names need localization (e.g., "Twitter" vs "X"), use dict
  // Otherwise, keep as is if truly universal.
  // BUT: Ensure validation messages or related UI text comes from dict.
]
```

#### C. create `lib/pricing-data.ts` (New)

Extract pricing data from specific components (like `PricingSection.tsx`).
_New_:

```typescript
export const getPricingPlans = (dict: AppDict) => [
  {
    name: dict.pricing.free.name,
    price: dict.pricing.free.price,
    features: [dict.pricing.free.feature1, ...],
  },
  // ...
]
```

## Phase 2: Component Refactor Execution

### 2.1. Core Components

Update components to fetch data using `useLocale()` + Data Factory.

- **`Sidebar.tsx`**:
  - Replace `import { toolsRoutes }` with `const routes = useMemo(() => getToolsRoutes(dict), [dict])`.
- **`AutoBreadcrumbs.tsx`**:
  - Map routes using the localized route tree.

### 2.2. Page Components

Scan and fix individual pages.

- **`app/page.tsx` (Home)**:
  - Refactor `HeroSection`: Pass localized title/subtitle.
  - Refactor `PricingSection`: Use `getPricingPlans(dict)`.
- **`app/tools/free/countdown-timer/page.tsx`**:
  - Extract all text (Start, Stop, Reset, headings) to `i18n.ts`.
- **`app/tools/premium/page.tsx`**:
  - Extract premium styling text.

### 2.3. Utility Components

- **`Toast.tsx`**: Ensure toast messages are passed from callers (who have access to `dict`), not hardcoded inside.
- **`FileUpload.tsx`**: Localize "Drop files here", "Browser", error messages.

## Phase 3: Metadata & SEO

- **`lib/config.ts`**: Check `toolConfig`.
- **`layout.tsx`**: Ensure `metadata` generation is dynamic or at least localized if Next.js allows (server-side generation).

## Detailed Checklist

- [x] **Audit**: Complete grep scan for all string literals (e.g., `'Search'`, `'Premium'`, `'description'`).
- [x] **Dictionary**: Update `lib/i18n.ts` with all missing keys.
- [x] **Routes**: Refactor `lib/tools-routes.ts` -> `getToolsRoutes(dict)`.
- [x] **Sidebar**: Connect `Sidebar` to `getToolsRoutes`.
- [ ] **Social**: Check `lib/social-platforms.ts` (may not need much change if names are proper nouns, but `detectPlatform` messages might).
- [ ] **Pricing**: Create `lib/data/pricing.ts` and refactor `PricingSection`.
- [ ] **Hero**: Refactor `HeroSection` to accept children or localized strings.
- [x] **Countdown**: Full i18n for Countdown Timer tool.
- [x] **QR Code Page**: Full i18n for QR Code Generator (Download/Copy/FAQ/Embed).
- [x] **QR Guide Page**: Full i18n for QR Code Guide page with factory function `getQRTypes`.
- [x] **README**: Updated README.md and README.en.md with i18n documentation.
- [ ] **Verification**: Switch language and verify EVERY text element changes (including sidebar, breadcrumbs, and content).

## Strict Rules

1.  **Do NOT** hardcode any string in `tsx` files except configuration keys (IDs).
2.  **Do NOT** import static data arrays for renderable text. Import the _type_ and the _generator function_.
3.  **DO** use `useMemo` for data derived from `dict` to prevent unnecessary re-renders.
