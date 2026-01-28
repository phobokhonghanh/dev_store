'use client'

import { DEFAULT_LOCALE, SupportedLocale } from '@/lib/config'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface LocaleContextValue {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

/**
 * Provider component for locale state management
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE)

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    setLocaleState(newLocale)
    // Optionally persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

/**
 * Hook to access locale context
 */
export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
