import merge from 'deepmerge'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette.js'
import typography from '@tailwindcss/typography'
import tailwindHighlightjs from 'tailwind-highlightjs'
import headlessui from '@headlessui/tailwindcss'

// Import Named Exports (theme, safelist) đã sửa từ các bước trước
import { theme as tremorTheme, safelist as tremorSafelist } from './tremor.theme.js'
import { theme as shadcnTheme } from './shadcn.theme.js'
import { theme as claudeTheme, safelist as claudeSafelist } from './claude.theme.js'
import { colors as designSystemColors } from './colors.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../apps/*/{app,components}/*.{js,ts,jsx,tsx}',
    '../../apps/*/{app,components}/**/*.{js,ts,jsx,tsx}',
    '../../apps/*/components/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/{components,libs}/*.{js,ts,jsx,tsx}',
    '../../packages/{components,libs}/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/ui/*.{js,ts,jsx,tsx}',
    '../../node_modules/@tremor/react/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/node_modules/@tremor/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...merge.all([
        tremorTheme,
        shadcnTheme,
        claudeTheme,
        {
          colors: designSystemColors,
        },
      ]),

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.black.100'),
            a: {
              color: theme('colors.blue.600'),
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
            h1: {
              fontWeight: theme('fontWeight.semibold'),
              fontSize: theme('fontSize.3xl'),
            },
          },
        },
        dark: {
          css: {
            a: { color: theme('colors.white') },
          },
        },
      }),
    },
    hljs: {
      theme: 'night-owl',
      custom: { base: { background: 'transparent' } },
    },
  },
  safelist: [
    { pattern: /hljs+/ },
    { pattern: /^bg-(ivory|oat|cream|cactus|sage|lavender|terracotta|coral)(-light|-medium)?$/ },
    { pattern: /^text-(ivory|oat|cream|cactus|sage|lavender|terracotta|coral)$/ },
    { pattern: /^text-(cactus|sage|lavender|terracotta|coral)$/ },
    // Dùng biến đã import, tránh dùng require()
    ...(tremorSafelist || []),
    ...(claudeSafelist || []),
  ],
  plugins: [
    typography,
    tailwindHighlightjs,
    headlessui,
    addVariablesForColors,
  ],
  darkMode: ['class', 'html[class~="dark"]'],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}