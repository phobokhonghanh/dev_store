import { useClipboard } from '@/lib/hooks/useClipboard'
import { useCallback, useState } from 'react'
import { Link as LinkIcon, Copy, Check, FileSpreadsheet, ExternalLink } from 'lucide-react'
import { cn } from '@origini/libs/utils'
import Link from 'next/link'
import { EmbedSectionDict } from '@/lib/i18n/types'

interface EmbedSectionProps {
  title: string
  content: string
  sheetsFormula?: string
  /** HTTP method indicator */
  method?: 'GET' | 'POST'
  onToast?: (message: string) => void
  className?: string
  /** Link to guide page */
  guideHref?: string
  /** Localization dictionary */
  dict: EmbedSectionDict
  /** Optionally hide the guide link */
  hideGuideLink?: boolean
}

/**
 * EmbedSection Component
 *
 * Displays API integration options in a compact format.
 * Detailed documentation is on the dedicated Guide page.
 *
 * Features:
 * - API URL with copy functionality
 * - Method badge (GET/POST) with color coding
 * - Google Sheets formula (GET only)
 * - Link to Guide page for full documentation
 *
 * Design Pattern: Single Responsibility - only handles embed display.
 */
export function EmbedSection({
  title,
  content,
  sheetsFormula,
  method = 'GET',
  onToast,
  className,
  guideHref = '/tools/free/qrcode/guide',
  dict,
  hideGuideLink,
}: EmbedSectionProps) {
  const { copy } = useClipboard({
    onSuccess: () => onToast?.(dict.copySuccess),
    onError: () => onToast?.(dict.copyError),
    timeout: 1000,
  })

  const [copiedField, setCopiedField] = useState<string | null>(null)

  /**
   * Copy with visual feedback
   */
  const handleCopy = useCallback(
    (text: string, field: string) => {
      if (!text) return
      copy(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 1500)
    },
    [copy],
  )

  if (!content) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center rounded-xl border border-dashed p-6 text-xs italic">
        {dict.enterContent}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* API URL Section */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <label className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-semibold uppercase">
            <LinkIcon size={12} />
            {title}
            {/* Method Badge */}
            <span
              className={cn(
                'ml-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold',
                method === 'GET'
                  ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              )}
            >
              {method}
            </span>
          </label>
          <button
            onClick={() => handleCopy(content, 'url')}
            className="text-primary hover:underline text-xs flex items-center gap-1"
          >
            {copiedField === 'url' ? <Check size={12} /> : <Copy size={12} />}
            {copiedField === 'url' ? dict.copied : dict.copy}
          </button>
        </div>
        <div className="bg-muted/30 rounded-lg border px-3 py-2.5 font-mono text-[11px] break-all select-all">
          {content}
        </div>
      </div>

      {/* Google Sheets Formula Section - Only for GET */}
      {method === 'GET' && sheetsFormula && (
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <label className="text-green-600 dark:text-green-400 flex items-center gap-1.5 text-[10px] font-semibold uppercase">
              <FileSpreadsheet size={12} />
              {dict.googleSheets}
            </label>
            <button
              onClick={() => handleCopy(sheetsFormula, 'sheets')}
              className="text-green-600 dark:text-green-400 hover:underline text-xs flex items-center gap-1"
            >
              {copiedField === 'sheets' ? <Check size={12} /> : <Copy size={12} />}
              {copiedField === 'sheets' ? dict.copied : dict.copy}
            </button>
          </div>
          <code className="bg-muted block overflow-x-auto rounded p-2 font-mono text-[10px] select-all">
            {sheetsFormula}
          </code>
        </div>
      )}

      {/* POST Warning - Compact */}
      {method === 'POST' && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 mb-3">
          <p className="text-amber-600 dark:text-amber-400 text-[10px] font-medium">
            ⚠️ {dict.postWarning}
          </p>
        </div>
      )}

      {/* Link to Guide Page */}
      {!hideGuideLink && (
        <Link
          href={guideHref}
          className="w-full flex items-center justify-center gap-1.5 p-2 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors text-xs font-medium text-primary"
        >
          <ExternalLink size={12} />
          {dict.viewGuide}
        </Link>
      )}
    </div>
  )
}
