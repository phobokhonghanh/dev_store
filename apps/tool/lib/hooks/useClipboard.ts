import { useCallback, useState } from 'react'

/** Default timeout in milliseconds for the 'copied' state */
const DEFAULT_COPY_TIMEOUT = 2000

/**
 * Options for the useClipboard hook
 */
interface UseClipboardOptions {
  /** How long to maintain the 'copied' state in ms (default: 2000) */
  timeout?: number
  /** Callback fired when a copy operation succeeds */
  onSuccess?: (text: string) => void
  /** Callback fired when a copy operation fails */
  onError?: (error: Error) => void
}

/**
 * Hook for handling copy-to-clipboard functionality with status feedback
 * and fallback support for older browsers or insecure contexts.
 */
export function useClipboard({
  timeout = DEFAULT_COPY_TIMEOUT,
  onSuccess,
  onError,
}: UseClipboardOptions = {}) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Internal helper using the legacy document.execCommand API as a fallback.
   */
  const copyWithFallback = useCallback(
    (text: string) => {
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        textArea.style.top = '0'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)

        if (successful) {
          setCopied(true)
          setError(null)
          onSuccess?.(text)
          setTimeout(() => setCopied(false), timeout)
        } else {
          throw new Error('execCommand copy failed')
        }
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        setError(errorObj)
        onError?.(errorObj)
      }
    },
    [timeout, onSuccess, onError],
  )

  /**
   * Primary function to trigger copying text.
   * Uses navigator.clipboard with execCommand fallback.
   */
  const copy = useCallback(
    async (text: string) => {
      if (!text) return

      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setError(null)
          onSuccess?.(text)
          setTimeout(() => setCopied(false), timeout)
        } catch (err) {
          console.warn('Navigator clipboard failed, trying fallback:', err)
          copyWithFallback(text)
        }
      } else {
        copyWithFallback(text)
      }
    },
    [timeout, onSuccess, onError, copyWithFallback],
  )

  return { copied, copy, error }
}

export default useClipboard
