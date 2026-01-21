'use client'

import { AutoBreadcrumbs } from '@/components/AutoBreadcrumbs'
import { NavRoute, toolsRoutes } from '@/lib/tools-routes'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

/**
 * Dashboard for the "Free Tools" category.
 * Displays a grid of available utilities with clear descriptions and icons.
 */
export default function ToolsFreePage() {
  // Find the 'Free Tools' section in the routes
  const freeToolsSection = toolsRoutes.find((r) => r.href === '/tools/free')
  const freeTools = freeToolsSection?.children || []

  return (
    <div className="mx-auto min-h-screen max-w-7xl p-4 md:p-8">
      <div className="mb-8">
        <AutoBreadcrumbs routes={toolsRoutes} />
      </div>

      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-500">
            <Sparkles size={24} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Free Developer Utilities
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl text-lg">
          High-quality, privacy-focused tools designed to simplify your daily
          development tasks. No registration, no ads, just focus.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {freeTools.map((tool: NavRoute) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group border-border bg-card hover:border-primary/50 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-xl"
          >
            {/* Tool Icon & Title */}
            <div className="mb-4 flex items-start justify-between">
              <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                {tool.icon}
              </div>
              <ArrowRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>

            <h2 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
              {tool.label}
            </h2>

            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
              {tool.description ||
                'Quick and efficient tool to boost your productivity.'}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-primary border-primary/20 bg-primary/5 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                Ready to Use
              </span>
            </div>

            {/* Subtle background glow on hover */}
            <div className="bg-primary/5 absolute -right-12 -bottom-12 h-24 w-24 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  )
}
