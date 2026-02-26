import { useMemo } from 'react'
import { QREmbedConfig, QREmbedGenerator } from '../embed'

// URL length threshold - URLs longer than this should use POST
const MAX_GET_URL_LENGTH = 2000

/**
 * Result type for useQREmbed hook
 */
export interface QREmbedResult {
  embedUrl: string
  sheetsFormula: string
  /** HTTP method: 'GET' for simple requests, 'POST' for complex ones */
  method: 'GET' | 'POST'
  /** Whether Sheets formula is available (only for GET) */
  sheetsAvailable: boolean
}

/**
 * Options for useQREmbed hook (external API)
 */
export interface UseQREmbedOptions {
  value: string
  type: string
  size: number
  fgColor: string
  bgColor: string
  rawData?: unknown
  domain?: boolean
  params_default?: boolean
}

/**
 * React Hook to generate embeddable QR Code assets.
 * Uses Strategy pattern for extensible type-specific URL generation.
 * 
 * Optimized: All values are derived via useMemo (no useEffect + useState).
 * This eliminates unnecessary re-renders and state synchronization issues.
 * 
 * Automatically determines whether to use GET or POST based on URL complexity.
 * - Simple types (url, text, phone, sms) → GET
 * - Complex types with lots of data (email with body, vcard) → POST if URL too long
 * 
 * @example
 * ```tsx
 * const { embedUrl, sheetsFormula, method, sheetsAvailable } = useQREmbed({
 *   value: 'https://example.com',
 *   type: 'url',
 *   size: 256,
 *   fgColor: '#000000',
 *   bgColor: '#ffffff',
 * })
 * ```
 */
export function useQREmbed(options: UseQREmbedOptions): QREmbedResult {
  // Normalize options to internal config format
  const config = useMemo<QREmbedConfig>(() => ({
    value: options.value,
    type: options.type,
    size: options.size,
    fgColor: options.fgColor,
    bgColor: options.bgColor,
    rawData: options.rawData,
    paramsDefault: options.params_default ?? false,
    domain: options.domain ?? true,
  }), [
    options.value,
    options.type,
    options.size,
    options.fgColor,
    options.bgColor,
    options.rawData,
    options.domain,
    options.params_default,
  ])

  // Memoize generator instance - only recreated when config changes
  const generator = useMemo(() => new QREmbedGenerator(config), [config])

  // Derive all values from generator - no useState needed
  return useMemo(() => {
    const url = generator.generateUrl()
    const usePost = url.length > MAX_GET_URL_LENGTH
    const method: 'GET' | 'POST' = usePost ? 'POST' : 'GET'
    const sheetsFormula = usePost ? '' : generator.generateSheetsFormula()

    return {
      embedUrl: url,
      sheetsFormula,
      method,
      sheetsAvailable: method === 'GET' && sheetsFormula !== '',
    }
  }, [generator])
}
