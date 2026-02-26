'use client'

import { NavRoute } from '@/lib/tools-routes'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AutoBreadcrumbsProps {
  routes: NavRoute[]
}

/**
 * Find path from root -> current route
 */
function findPath(
  pathname: string,
  routes: NavRoute[],
  trail: NavRoute[] = [],
): NavRoute[] | null {
  for (const item of routes) {
    const newTrail = [...trail, item]

    // Check exact match or logic handled by app/page structure
    // Note: ensure we don't falsely match root / if we are at /tools
    if (item.href === pathname) return newTrail

    if (item.children) {
      const found = findPath(pathname, item.children, newTrail)
      if (found) return found
    }
  }

  return null
}

export function AutoBreadcrumbs({ routes }: AutoBreadcrumbsProps) {
  const pathname = usePathname()

  // Find trail
  const trail: NavRoute[] = findPath(pathname, routes) ?? []

  if (trail.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground mb-4 flex items-center text-sm font-medium"
    >
      <ol className="flex items-center gap-2">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1

          return (
            <li key={item.href} className="flex items-center gap-2">
              {/* Separator if not first */}
              {index > 0 && (
                <ChevronRight className="text-muted-foreground/50 h-4 w-4" />
              )}

              <Link
                href={item.href}
                className={`hover:text-foreground flex items-center gap-2 transition-colors ${
                  isLast
                    ? 'text-foreground pointer-events-none font-semibold'
                    : 'text-muted-foreground'
                }`}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.icon && (
                  <span className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
