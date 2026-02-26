'use client'

import { DEFAULT_LOCALE, SupportedLocale } from '@/lib/config'
import { cn } from '@origini/libs/utils'
import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

/** Flag data for supported languages */
const LANGUAGES = [
  {
    code: 'vi' as const,
    name: 'Tiếng Việt',
    flag: '🇻🇳',
  },
  {
    code: 'en' as const,
    name: 'English',
    flag: '🇬🇧',
  },
]

interface LanguageSwitcherProps {
  /** Current locale */
  locale?: SupportedLocale
  /** Callback when locale changes */
  onLocaleChange: (locale: SupportedLocale) => void
  /** Collapsed mode (icon only) */
  isCollapsed?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Language Switcher Component
 * Displays a dropdown with flag icons to switch between Vietnamese and English
 */
export function LanguageSwitcher({
  locale = DEFAULT_LOCALE,
  onLocaleChange,
  isCollapsed = false,
  className,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = useCallback(
    (code: SupportedLocale) => {
      onLocaleChange(code)
      setIsOpen(false)
    },
    [onLocaleChange],
  )

  if (isCollapsed) {
    // Collapsed mode: just show current flag, click to toggle
    return (
      <div ref={dropdownRef} className={cn('relative', className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-primary/10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors"
          title={currentLang.name}
        >
          <span className="text-xl">{currentLang.flag}</span>
        </button>

        {isOpen && (
          <div className="bg-popover border-border absolute bottom-full left-0 z-50 mb-1 overflow-hidden rounded-md border shadow-lg">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors',
                  lang.code === locale
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                )}
              >
                <span className="text-lg">{lang.flag}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Expanded mode: show flag + name with dropdown
  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'hover:bg-primary/10 flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
          isOpen && 'bg-primary/5',
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-muted-foreground font-medium">
            {currentLang.name}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            'text-muted-foreground transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div className="bg-popover border-border absolute bottom-full left-0 z-50 mb-1 w-full overflow-hidden rounded-md border shadow-lg">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                'flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors',
                lang.code === locale
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted',
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
