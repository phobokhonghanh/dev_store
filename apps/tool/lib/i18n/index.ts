/**
 * i18n Module
 * Centralized internationalization with JSON-based translations
 * Updated for EmbedSection
 */

import type { SupportedLocale } from '../config'
import type { AppDict, LocationFormDict } from './types'

// Import JSON locales
import viLocale from './locales/vi.json'
import enLocale from './locales/en.json'

// Re-export all types for convenience
export * from './types'

// ============================================================================
// DICTIONARY REGISTRY
// ============================================================================

const I18N: Record<SupportedLocale, AppDict> = {
    vi: viLocale as AppDict,
    en: enLocale as AppDict,
}

/**
 * Get the complete dictionary for a locale
 */
export function getAppDict(locale: SupportedLocale): AppDict {
    return I18N[locale]
}

/**
 * Legacy function for LocationForm compatibility
 * @deprecated Use getAppDict(locale).location instead
 */
export function getDict(locale: SupportedLocale): LocationFormDict {
    return I18N[locale].location
}

/**
 * Get all available locales
 */
export function getAvailableLocales(): SupportedLocale[] {
    return Object.keys(I18N) as SupportedLocale[]
}
