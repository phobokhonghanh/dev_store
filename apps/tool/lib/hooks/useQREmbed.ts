import { useEffect, useState } from 'react'

export interface UseQREmbedOptions {
  value: string
  type: string
  size: number
  fgColor: string
  bgColor: string
  domain?: boolean
  params_default?: boolean
}

export interface UseQREmbedResult {
  embedUrl: string
  sheetsFormula: string
}

/**
 * Hook to generate embeddable assets for the QR Code (API URL and Google Sheets Formula).
 * Simplified to use only the generated string value, ignoring complex raw data.
 */
export function useQREmbed({
  domain = true,
  params_default = false,
  value,
  type,
  size,
  fgColor,
  bgColor,
}: UseQREmbedOptions): UseQREmbedResult {
  const [embedUrl, setEmbedUrl] = useState('')
  const [sheetsFormula, setSheetsFormula] = useState('')

  useEffect(() => {
    // Only run on client-side and when there is a value
    if (typeof window === 'undefined' || !value) {
      setEmbedUrl('')
      setSheetsFormula('')
      return
    }

    const origin = window.location.origin
    const url = new URL('/api/qrcode', origin)

    // Core display params - Only add if not default
    if (params_default || size !== 256) {
      url.searchParams.set('size', size.toString())
    }

    if (params_default || fgColor !== '#000000') {
      url.searchParams.set('dark', fgColor)
    }

    if (params_default || bgColor !== '#ffffff') {
      url.searchParams.set('light', bgColor)
    }

    // Simply use the value as 'data' (text) or 'weburl' (url)
    // complex types (wifi, vcard, payment) are pre-generated string values found in 'value'
    // so we treat them as 'text' type for the API unless it's a specific simple URL.

    if (type === 'url') {
      url.searchParams.set('type', 'url')
      url.searchParams.set('weburl', value)
    } else {
      // Default / Text fallback for all other types (wifi, vcard, etc are just text strings)
      url.searchParams.set('type', 'text')
      url.searchParams.set('data', value)
    }

    const fullUrl = url.toString()
    setEmbedUrl(domain ? fullUrl : url.search)
    setSheetsFormula(`=IMAGE("${fullUrl}")`)
  }, [value, type, size, fgColor, bgColor])

  return {
    embedUrl,
    sheetsFormula,
  }
}
