'use client'

import { NavRoute, toolsRoutes } from '@/lib/tools'
import { cn } from '@origini/libs/utils'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// Recursive Nav Item Component
const NavItem = ({ route, depth = 0 }: { route: NavRoute; depth?: number }) => {
  const pathname = usePathname()
  const isActive =
    pathname === route.href || pathname.startsWith(route.href + '/')
  const [isOpen, setIsOpen] = useState(isActive || route.opened)

  const hasChildren = route.children && route.children.length > 0

  return (
    <div className="w-full">
      <div
        className={cn(
          'group hover:bg-accent hover:text-accent-foreground flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-accent/50 text-accent-foreground'
            : 'text-muted-foreground',
          depth > 0 && 'ml-4',
        )}
      >
        <Link
          href={route.href}
          className="flex flex-1 items-center gap-2 overflow-hidden"
        >
          {route.icon && <span className="h-4 w-4 shrink-0">{route.icon}</span>}
          <span className="truncate">{route.label}</span>
        </Link>

        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
            className="hover:bg-background/80 ml-2 rounded-sm p-1"
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
            <NavItem key={child.href} route={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  header?: React.ReactNode
}

export function Sidebar({ header }: SidebarProps) {
  return (
    <nav className="bg-card sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r px-3 py-6 md:block">
      <div className="space-y-1">
        {header && <div className="mb-6 px-3">{header}</div>}
        {toolsRoutes.map((route) => (
          <NavItem key={route.href} route={route} />
        ))}
      </div>
    </nav>
  )
}
