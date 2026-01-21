import { cn } from '@origini/libs/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface DynamicTabsProps {
  items: TabItem[]
  defaultValue?: string
  onChange?: (value: string) => void
  grow?: boolean
}

/**
 * A reusable tabbed interface component that renders navigation buttons and content.
 * Supports growing to full width or inline sizing with horizontal scrolling and navigation arrows.
 */
export default function DynamicTabs({
  items,
  defaultValue,
  onChange,
  grow = true,
}: DynamicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.value)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onChange?.(value)
  }

  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [items])

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

  const scrollLeft = () => {
    tabsRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    tabsRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }

  const activeContent = items.find((item) => item.value === activeTab)?.content

  return (
    <div className="w-full">
      <div className="group relative">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="bg-background/95 text-primary absolute top-0 left-0 z-10 flex h-full w-10 items-center justify-center shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] transition-opacity"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          ref={tabsRef}
          onScroll={checkScroll}
          className={cn(
            'border-border no-scrollbar mb-4 flex overflow-x-auto scroll-smooth border-b',
            grow ? '' : 'inline-flex w-max max-w-full',
            showLeftArrow && 'pl-10',
            showRightArrow && 'pr-10',
          )}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <button
              key={item.value}
              data-active={activeTab === item.value}
              onClick={() => handleTabChange(item.value)}
              className={cn(
                'flex items-center justify-center gap-2 border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                activeTab === item.value
                  ? 'border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:border-muted border-transparent',
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
            className="bg-background/95 text-primary absolute top-0 right-0 z-10 flex h-full w-10 items-center justify-center shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] transition-opacity"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {activeContent && <div className="mt-4">{activeContent}</div>}
    </div>
  )
}
