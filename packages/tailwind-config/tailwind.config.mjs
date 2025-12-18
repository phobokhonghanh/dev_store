import merge from 'deepmerge'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette.js'
import tailwindHighlightJs from 'tailwind-highlightjs'
import headlessui from '@headlessui/tailwindcss'

// Import Named Exports từ các file theme
import { theme as tremorTheme, safelist as tremorSafelist } from './tremor.theme.js'
import { theme as shadcnTheme } from './shadcn.theme.js'
import { theme as claudeTheme, safelist as claudeSafelist } from './claude.theme.js'
import { colors as designSystemColors } from './colors.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Related path
    '../../apps/*/{app,components}/*.{js,ts,jsx,tsx}',
    '../../apps/*/{app,components}/**/*.{js,ts,jsx,tsx}',
    '../../apps/*/components/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/{components,libs}/*.{js,ts,jsx,tsx}',
    '../../packages/{components,libs}/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/ui/*.{js,ts,jsx,tsx}',
    // Path to the tremor module
    '../../node_modules/@tremor/react/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/node_modules/@tremor/react/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {
    extend: {
      opacity: ['disabled'],
      typography: ['dark'],
    },
    typography: ['dark'],
  },
  theme: {
    extend: {
      // Merge tất cả theme lại với nhau
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
              textDecorationThickness: 'from-font',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              overflowWrap: 'break-word',
              whiteSpace: 'break-spaces',
              wordBreak: 'break-word',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'a[href^="https://"]': {
              '&::after': {
                content: '"↗︎"',
              },
            },
            h1: {
              fontWeight: theme('fontWeight.semibold'),
              fontSize: theme('fontSize.3xl'),
              marginTop: theme('spacing.10'),
            },
            pre: {
              padding: 5,
            },
            code: {
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            },
          },
        },
        dark: {
          css: {
            a: {
              color: theme('colors.white'),
              textDecoration: 'underline',
            },
          },
        },
      }),
    },
    hljs: {
      theme: 'night-owl',
      custom: {
        base: {
          background: 'transparent',
        },
      },
    },
  },
  safelist: [
    {
      pattern: /hljs+/,
    },
    // Card component color classes (for blog color palette)
    {
      pattern: /^bg-(ivory|oat|cream|cactus|sage|lavender|terracotta|coral)(-light|-medium)?$/,
    },
    {
      pattern: /^text-(ivory|oat|cream|cactus|sage|lavender|terracotta|coral)$/,
    },
    {
      pattern: /^text-(cactus|sage|lavender|terracotta|coral)$/,
    },
    // Spread các safelist đã import (thêm check mảng rỗng để an toàn)
    ...(tremorSafelist || []),
    ...(claudeSafelist || []),
  ],
  plugins: [
    // Thay require bằng biến đã import
    tailwindHighlightJs,
    headlessui, // Thay thế cho tremor plugins
    addVariablesForColors,
  ],
  darkMode: ['class', 'html[class~="dark"]'],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}