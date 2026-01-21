import { useClipboard } from '@/lib/hooks/useClipboard'
import { useCallback } from 'react'

interface EmbedSectionProps {
  title: string
  content: string
  onToast?: (message: string) => void
  className?: string
}
/**
 * Component to display a copyable text block (e.g. embed codes or formulas).
 * Includes a "Copy" button with toast feedback.
 */
export function EmbedSection({
  title,
  content,
  onToast,
  className,
}: EmbedSectionProps) {
  const { copy } = useClipboard({
    onSuccess: () => onToast?.('Copied to clipboard!'),
    onError: () => onToast?.('Failed to copy.'),
    timeout: 1000,
  })

  const handleCopy = useCallback(
    (text: string) => {
      if (!text) return
      copy(text)
    },
    [copy],
  )

  if (!content) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center rounded-xl border border-dashed p-6 text-xs italic">
        Enter content to see embed options
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="space-y-1.5">
        <label className="text-muted-foreground flex items-center justify-between text-[10px] font-semibold uppercase">
          {title}
          <button
            onClick={() => handleCopy(content)}
            className="text-primary hover:underline"
          >
            Copy
          </button>
        </label>
        <div className="bg-muted/30 rounded-lg border px-3 py-2.5 font-mono text-[11px] break-all">
          {content}
        </div>
      </div>
    </div>
  )
}
