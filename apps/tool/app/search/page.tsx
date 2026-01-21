'use client'

import { NavRoute, toolsRoutes } from '@/lib/tools-routes'
import { cn } from '@origini/libs/utils'
import { Crown, Search } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

// Flatten routes to get all searchable items
const getAllTools = (routes: NavRoute[]): NavRoute[] => {
  let tools: NavRoute[] = []
  routes.forEach((route) => {
    // If it's the "Search" itself, don't include it in results
    if (route.href === '/search') return

    if (route.children) {
      tools = [...tools, ...getAllTools(route.children)]
    } else {
      tools.push(route)
    }
  })
  return tools
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all')

  const allTools = useMemo(() => getAllTools(toolsRoutes), [])

  const filteredTools = useMemo(() => {
    let tools = allTools

    // Filter by type
    if (filter === 'free') {
      tools = tools.filter((t) => !t.isPremium)
    } else if (filter === 'premium') {
      tools = tools.filter((t) => t.isPremium)
    }

    // Search by term
    if (!searchTerm) return tools
    const lower = searchTerm.toLowerCase()
    return tools.filter(
      (t) =>
        t.label.toLowerCase().includes(lower) ||
        t.slug?.toLowerCase().includes(lower) ||
        t.description?.toLowerCase().includes(lower),
    )
  }, [searchTerm, allTools, filter])

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      {/* Header & Search */}
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-primary text-4xl font-extrabold tracking-tight lg:text-5xl">
            Explore Toolkit
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Powerful tools for developers, designers, and creators.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Search Input */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Search className="text-muted-foreground h-5 w-5" />
            </div>
            <input
              type="text"
              className="border-border bg-card ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary h-14 w-full rounded-2xl border px-12 text-lg shadow-sm transition-all focus-visible:ring-2 focus-visible:outline-none"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Tools' },
              { id: 'free', label: 'Free' },
              { id: 'premium', label: 'Premium' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as 'all' | 'free' | 'premium')}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                  filter === btn.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted',
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold tracking-tight">
            {searchTerm || filter !== 'all'
              ? `Search Results (${filteredTools.length})`
              : 'All Tools'}
          </h2>
        </div>

        {filteredTools.length === 0 ? (
          <div className="bg-muted/10 rounded-3xl border border-dashed py-20 text-center">
            <div className="bg-muted/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Search className="text-muted-foreground h-8 w-8" />
            </div>
            <p className="text-muted-foreground text-lg">
              No tools found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setFilter('all')
              }}
              className="text-primary mt-4 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-card hover:border-primary/50 relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {tool.isPremium && (
                  <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                    <Crown size={14} className="fill-current" />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                    {tool.icon || <Search size={22} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
                        {tool.label}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                      {tool.description ||
                        `Access the ${tool.label} utility for your development needs.`}
                    </p>
                  </div>

                  <div className="text-primary mt-2 flex items-center text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Open Tool
                    <span className="ml-1 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
