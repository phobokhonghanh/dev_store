'use client'

import { getAppDict, type AppDict } from '@/lib/i18n'
import { useMemo } from 'react'
import { useLocale } from './useLocale'

/**
 * useDict - Convenience hook to get the i18n dictionary for the current locale.
 * Combines useLocale() and getAppDict() into a single call.
 *
 * @returns The complete AppDict for the current locale
 *
 * @example
 * ```tsx
 * // Instead of:
 * const { locale } = useLocale()
 * const dict = useMemo(() => getAppDict(locale), [locale])
 *
 * // Just use:
 * const dict = useDict()
 * return <h1>{dict.sidebar.search}</h1>
 * ```
 */
export function useDict(): AppDict {
  const { locale } = useLocale()
  return useMemo(() => getAppDict(locale), [locale])
}
