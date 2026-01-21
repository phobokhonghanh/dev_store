import { generateVietQR } from './vietqr'

/**
 * Interface for WiFi network configuration
 */
export interface WiFiData {
  /** Network name (SSID) */
  ssid: string
  /** Network password */
  password: string
  /** Encryption type: WPA (default), WEP, or nopass */
  encryption: 'WPA' | 'WEP' | 'nopass'
  /** Whether the network is hidden */
  hidden: boolean
}

/**
 * Interface for payment transfer data
 */
export interface PaymentData {
  /** Bank BIN (Business Identification Number) */
  bankBin: string
  /** Target account number */
  account: string
  /** Account holder name (for display) */
  name: string
  /** Transfer amount */
  amount: string
  /** Transfer message/content */
  content: string
}

/**
 * Interface for custom key-value fields (e.g., VCard fields)
 */
export interface CustomField {
  /** Unique identifier for UI tracking */
  id?: string
  /** Field key/identifier (e.g., 'FN', 'TEL') */
  key: string
  /** Field value/content */
  value: string
  /** Human-readable label (optional) */
  label?: string
}

/**
 * Promotion footer added to generated text-based QR codes
 */
const QR_PROMOTION_TEXT =
  '\n\n---\nCreate your own QR code at: tuitenpho-tool.vercel.app'

/**
 * Generates a WiFi configuration string compatible with QR scanners
 * Format: WIFI:T:WPA;S:MyNetwork;P:password123;H:false;;
 *
 * @param data - The configuration for the WiFi network
 * @returns A formatted WiFi string or an empty string if SSID is missing
 */
export const generateWifiString = (data: WiFiData): string => {
  if (!data.ssid) return ''
  return `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};H:${data.hidden};;`
}

/**
 * Generates a formatted string for VCard or simple key-value lists
 *
 * @param fields - Array of custom fields to include
 * @returns A newline-separated string of key-value pairs with promotion footer
 */
export const generateVCardString = (fields: CustomField[]): string => {
  const activeFields = fields.filter((f) => f.value.trim())
  if (activeFields.length === 0) return ''

  const content = activeFields
    .map((f) => `${f.label || f.key}: ${f.value}`)
    .join('\n')
  return content + QR_PROMOTION_TEXT
}

/**
 * Helper to generate newline-separated content without the promotion footer
 * Useful for internal logic or API responses where clean data is needed
 *
 * @param fields - Array of custom fields
 * @returns A formatted string of active key-value pairs
 */
export const generateCustomContent = (fields: CustomField[]): string => {
  return fields
    .filter((f) => f.value.trim())
    .map((f) => `${f.label || f.key}: ${f.value}`)
    .join('\n')
}

/**
 * Generates a VietQR compatible string for bank transfers
 *
 * @param data - The payment transfer data
 * @returns A formatted EMVCo-compatible QR string or empty if core data is missing
 */
export const generatePaymentString = (data: PaymentData): string => {
  if (!data.bankBin || !data.account) return ''
  return generateVietQR({
    bankBin: data.bankBin,
    accountNo: data.account,
    amount: data.amount,
    content: data.content,
  })
}
