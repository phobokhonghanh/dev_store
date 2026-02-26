import { cn } from '@origini/libs/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

export interface DynamicTabsProps {
  items: TabItem[]
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  grow?: boolean
  className?: string
}

/**
 * A reusable tabbed interface component with full ARIA accessibility support.
 * 
 * Features:
 * - Keyboard navigation: Arrow Left/Right to switch tabs
 * - ARIA roles: tablist, tab, tabpanel
 * - Horizontal scrolling with navigation arrows
 * - Controlled & uncontrolled modes
 */
export default function DynamicTabs({
  items,
  defaultValue,
  value,
  onChange,
  grow = true,
  className,
}: DynamicTabsProps) {
  const [internalTab, setInternalTab] = useState(defaultValue || items[0]?.value)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const activeTab = value !== undefined ? value : internalTab

  const handleTabChange = useCallback((val: string) => {
    if (value === undefined) {
      setInternalTab(val)
    }
    onChange?.(val)
  }, [value, onChange])

  const checkScroll = useCallback(() => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [items, checkScroll])

  useEffect(() => {
    if (tabsRef.current) {
      const activeBtn = tabsRef.current.querySelector(
        '[data-active="true"]',
      ) as HTMLElement
      if (activeBtn) {
        const container = tabsRef.current
        const scrollLeft =
          activeBtn.offsetLeft -
          container.clientWidth / 2 +
          activeBtn.clientWidth / 2
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
  }, [activeTab])

  const scrollLeft = useCallback(() => {
    tabsRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }, [])

  const scrollRight = useCallback(() => {
    tabsRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }, [])

  /**
   * Keyboard navigation handler for ARIA tab pattern.
   * Arrow Left/Right cycles through tabs, Home/End jump to first/last.
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        nextIndex = (currentIndex + 1) % items.length
        break
      case 'ArrowLeft':
        e.preventDefault()
        nextIndex = (currentIndex - 1 + items.length) % items.length
        break
      case 'Home':
        e.preventDefault()
        nextIndex = 0
        break
      case 'End':
        e.preventDefault()
        nextIndex = items.length - 1
        break
    }

    if (nextIndex !== null) {
      handleTabChange(items[nextIndex].value)
      // Focus the newly active tab button
      const buttons = tabsRef.current?.querySelectorAll('[role="tab"]')
        ; (buttons?.[nextIndex] as HTMLElement)?.focus()
    }
  }, [items, handleTabChange])

  const activeContent = items.find((item) => item.value === activeTab)?.content

  return (
    <div className={cn("w-full", className)}>
      <div className="group relative">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            aria-label="Scroll tabs left"
            tabIndex={-1}
            className="text-muted-foreground hover:text-foreground absolute top-0 left-0 z-10 flex h-full w-8 cursor-pointer items-center justify-center bg-gradient-to-r from-background via-background to-transparent transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        <div
          ref={tabsRef}
          role="tablist"
          aria-label="QR Code types"
          onScroll={checkScroll}
          className={cn(
            'border-border no-scrollbar mb-4 flex overflow-x-auto scroll-smooth border-b',
            grow ? '' : 'inline-flex w-max max-w-full',
            showLeftArrow && 'pl-8',
            showRightArrow && 'pr-8',
          )}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <button
              key={item.value}
              role="tab"
              aria-selected={activeTab === item.value}
              aria-controls={`tabpanel-${item.value}`}
              id={`tab-${item.value}`}
              tabIndex={activeTab === item.value ? 0 : -1}
              data-active={activeTab === item.value}
              onClick={() => handleTabChange(item.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'flex cursor-pointer items-center justify-center gap-2 border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1',
                activeTab === item.value
                  ? 'border-primary text-primary'
                  : 'text-muted-foreground border-transparent hover:border-primary/50',
                grow && !showRightArrow && !showLeftArrow
                  ? 'flex-1'
                  : 'flex-shrink-0',
              )}
            >
              {item.icon && <span className="h-4 w-4">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={scrollRight}
            aria-label="Scroll tabs right"
            tabIndex={-1}
            className="text-muted-foreground hover:text-foreground absolute top-0 right-0 z-10 flex h-full w-8 cursor-pointer items-center justify-center bg-gradient-to-l from-background via-background to-transparent transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {activeContent && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="mt-4"
        >
          {activeContent}
        </div>
      )}
    </div>
  )
}
