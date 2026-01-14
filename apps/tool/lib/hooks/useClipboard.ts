import { useCallback, useState } from 'react'

export function useClipboard({ timeout = 2000 } = {}) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copy = useCallback(
    (text: string) => {
      if (!navigator.clipboard) {
        // Fallback for older browsers? Not needed for modern nextjs usually
        console.warn('Clipboard not supported')
        return
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true)
          setError(null)
          setTimeout(() => setCopied(false), timeout)
        })
        .catch((err) => {
          setError(err)
          setCopied(false)
        })
    },
    [timeout],
  )

  return { copied, copy, error }
}
