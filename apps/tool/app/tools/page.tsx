'use client'

import { toolsRoutes } from '@/data/tools'
import { NavRoute } from '@/types/nav'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

// Flatten routes to get all searchable items
const getAllTools = (routes: NavRoute[]): NavRoute[] => {
  let tools: NavRoute[] = []
  routes.forEach((route) => {
    if (route.children) {
      tools = [...tools, ...getAllTools(route.children)]
    } else {
      tools.push(route)
    }
  })
  return tools
}

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const allTools = useMemo(() => getAllTools(toolsRoutes), [])

  const filteredTools = useMemo(() => {
    if (!searchTerm) return allTools
    const lower = searchTerm.toLowerCase()
    return allTools.filter(
      (t) =>
        t.label.toLowerCase().includes(lower) ||
        t.slug?.toLowerCase().includes(lower),
    )
  }, [searchTerm, allTools])

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header & Search */}
      <div className="space-y-4 py-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-green-600 lg:text-5xl dark:text-green-500">
          Developer Tools
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          A collection of free tools for developers. Open source and free to
          use.
        </p>

        <div className="relative mx-auto max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <Search className="text-muted-foreground h-5 w-5" />
          </div>
          <input
            type="text"
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-full border py-2 pr-4 pl-10 text-base shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search tools (e.g., QR Code, JSON)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {searchTerm
            ? `Search Results (${filteredTools.length})`
            : 'All Tools'}
        </h2>

        {filteredTools.length === 0 ? (
          <div className="text-muted-foreground bg-muted/20 rounded-lg border border-dashed py-12 text-center">
            <p>No tools found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-card hover:border-primary/50 block rounded-xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-lg p-3 transition-colors">
                    {tool.icon || <Search size={24} />}
                  </div>
                  <div>
                    <h3 className="group-hover:text-primary text-lg font-semibold transition-colors">
                      {tool.label}
                    </h3>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                      Useful {tool.label} tool for your daily tasks.
                    </p>
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
