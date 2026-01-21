'use client'

import { SOCIAL_PLATFORMS } from '@/lib/social-platforms'
import { cn } from '@origini/libs/utils'
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Search,
  Trash2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Label } from '../../Form'

interface LogoManagerProps {
  /** Effective logo being used */
  currentLogo?: string | null
  /** Callback to set logo manually */
  onSelectLogo: (logoUrl: string | null) => void
  /** Toggle for logo visibility */
  showLogo: boolean
  /** Callback for visibility toggle */
  onToggleShowLogo: (show: boolean) => void
  /** Whether auto-detection is enabled */
  autoDetectEnabled: boolean
  /** Callback for auto-detect toggle */
  onToggleAutoDetect: (enabled: boolean) => void
}

const ITEMS_PER_PAGE = 8

export function LogoManager({
  currentLogo,
  onSelectLogo,
  showLogo,
  onToggleShowLogo,
  autoDetectEnabled,
  onToggleAutoDetect,
}: LogoManagerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)

  const filteredPlatforms = useMemo(() => {
    return SOCIAL_PLATFORMS.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const totalPages = Math.ceil(filteredPlatforms.length / ITEMS_PER_PAGE)
  const paginatedPlatforms = filteredPlatforms.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  )

  const handleSelect = (url: string) => {
    onSelectLogo(url)
    // If selecting a preset, maybe we should disable auto-detect?
    // User choice usually overrides auto-detect until they change the URL again.
  }

  return (
    <div className="bg-muted/20 space-y-4 rounded-xl border p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="accent-primary h-4 w-4 rounded border-gray-300"
            checked={showLogo}
            onChange={(e) => onToggleShowLogo(e.target.checked)}
          />
          <span className="text-sm font-semibold">Show Logo in QR</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="accent-primary h-4 w-4 rounded border-gray-300"
            checked={autoDetectEnabled}
            onChange={(e) => onToggleAutoDetect(e.target.checked)}
          />
          <span className="text-muted-foreground text-sm font-semibold">
            Auto-detect Logo
          </span>
        </label>
      </div>

      {showLogo && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="bg-background relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 border-dashed">
              {currentLogo ? (
                <img
                  src={currentLogo}
                  alt="Current Logo"
                  className="h-full w-full rounded object-contain p-1"
                />
              ) : (
                <ImageIcon size={24} className="text-muted-foreground/40" />
              )}
              {currentLogo && (
                <button
                  onClick={() => onSelectLogo(null)}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
                >
                  <Trash2 size={10} />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold">Active Logo</span>
              <p className="text-muted-foreground text-xs">
                {currentLogo
                  ? 'Logo will be displayed in center'
                  : 'No logo selected'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Preset Logos
              </Label>
              <div className="relative">
                <Search
                  size={14}
                  className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Filter..."
                  className="bg-background focus:ring-primary h-7 w-24 rounded-md border pr-2 pl-7 text-xs focus:ring-1 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setPage(0)
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {paginatedPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleSelect(platform.logo)}
                  className={cn(
                    'bg-background hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center gap-1 rounded-lg border p-2 transition-all',
                    currentLogo === platform.logo &&
                      'border-primary ring-primary ring-1',
                  )}
                  title={platform.name}
                >
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="h-6 w-6 object-contain"
                  />
                  <span className="line-clamp-1 w-full text-center text-[8px]">
                    {platform.name}
                  </span>
                </button>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  className="hover:bg-muted rounded p-1 disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-muted-foreground text-[10px] font-medium">
                  {page + 1} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages - 1}
                  onClick={() => setPage(page + 1)}
                  className="hover:bg-muted rounded p-1 disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
