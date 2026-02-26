'use client'

import React, { useMemo } from 'react'

import { LanguageSwitcher } from '@/components/ui'
import { useLocale } from '@/lib/hooks/useLocale'
import { getAppDict } from '@/lib/i18n'
import { getToolsRoutes, NavRoute } from '@/lib/tools-routes'
import { Logo } from '@origini/components'
import { cn } from '@origini/libs/utils'
import {
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// Recursive Nav Item Component
const NavItem = ({
  route,
  depth = 0,
  isCollapsed,
}: {
  route: NavRoute
  depth?: number
  isCollapsed: boolean
}) => {
  const pathname = usePathname()
  const isActive =
    pathname === route.href || pathname.startsWith(route.href + '/')
  const [isOpen, setIsOpen] = useState(isActive || route.opened)

  const hasChildren = route.children && route.children.length > 0

  if (isCollapsed) {
    return (
      <div
        className="group relative flex w-full justify-center py-2"
        title={route.label}
      >
        <Link
          href={route.href}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-md transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
          )}
        >
          {route.icon ? (
            <span className="h-5 w-5 shrink-0">{route.icon}</span>
          ) : (
            <span className="text-xs font-bold">
              {route.label.substring(0, 2)}
            </span>
          )}
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          'group hover:bg-primary/5 hover:text-primary flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
          depth > 0 && 'ml-4',
        )}
      >
        <Link
          href={route.href}
          className="flex flex-1 items-center gap-2 overflow-hidden"
        >
          {route.icon && (
            <span
              className={cn(
                'h-4 w-4 shrink-0 transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-primary',
              )}
            >
              {route.icon}
            </span>
          )}
          <span className="truncate">{route.label}</span>
        </Link>

        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
            className="hover:bg-primary/10 ml-2 cursor-pointer rounded-sm p-1 transition-colors"
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="border-border/50 mt-1 ml-3.5 space-y-1 border-l pl-1">
          {route.children!.map((child) => (
            <NavItem
              key={child.href}
              route={child}
              depth={depth + 1}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  header?: React.ReactNode
  isCollapsed: boolean
  toggleSidebar: () => void
}

export const Sidebar = React.memo(function Sidebar({
  header,
  isCollapsed,
  toggleSidebar,
}: SidebarProps) {
  const { locale, setLocale } = useLocale()
  const dict = useMemo(() => getAppDict(locale), [locale])
  const routes = useMemo(() => getToolsRoutes(dict), [dict])

  return (
    <nav
      className={cn(
        'bg-card sticky top-0 hidden h-screen shrink-0 border-r transition-all duration-300 md:block',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header Section */}
        <div
          className={cn('relative', isCollapsed ? 'px-1 py-4' : 'px-3 py-4')}
        >
          {!isCollapsed && header}
          {isCollapsed && (
            <div className="mb-4 flex justify-center pt-2">
              <Logo width={32} height={32} />
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className={cn(
              'text-muted-foreground hover:text-primary absolute top-4 right-2 cursor-pointer transition-colors',
              isCollapsed ? 'top-16 right-1/2 translate-x-1/2' : '',
            )}
          >
            {isCollapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <NavItem
                key={route.href}
                route={route}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Footer: Language Switcher */}
        <div
          className={cn(
            'border-border border-t',
            isCollapsed ? 'px-1 py-2' : 'px-2 py-3',
          )}
        >
          <LanguageSwitcher
            locale={locale}
            onLocaleChange={setLocale}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>
    </nav>
  )
})
