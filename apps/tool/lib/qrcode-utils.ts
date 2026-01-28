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
 * Interface for Calendar Event data
 */
export interface EventData {
  title: string
  startDate: string
  endDate: string
  location: string
  description: string
}

/**
 * Interface for Email data
 */
export interface EmailData {
  email: string
  subject: string
  body: string
}

/**
 * Interface for SMS data
 */
export interface SmsData {
  phone: string
  message: string
}

/**
 * Interface for Location data
 */
export interface LocationData {
  lat: string
  lng: string
  useGoogleMaps?: boolean
}

/**
 * Interface for App Store data
 */
export interface AppStoreData {
  iosUrl: string
  androidUrl: string
}

/**
 * Promotion footer added to generated text-based QR codes
 */
const QR_PROMOTION_TEXT =
  '\n\n---\nCreate your own QR code at: tuitenpho-tool.vercel.app'

/**
 * Generates a WiFi configuration string compatible with QR scanners
 * Format: WIFI:T:WPA;S:MyNetwork;P:password123;H:false;;
 */
export const generateWifiString = (data: WiFiData): string => {
  if (!data.ssid) return ''
  return `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};H:${data.hidden};;`
}

/**
 * Generates a formatted string for VCard or simple key-value lists
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
 * Generates a VietQR compatible string for bank transfers
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

/**
 * Generates an iCal format string for Calendar Events
 * Format: BEGIN:VCALENDAR...
 */
export const generateEventString = (data: EventData): string => {
  if (!data.title) return ''
  const format = (d: string) => d.replace(/[-:]/g, '').split('.')[0] + 'Z'
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${data.title}`,
    `DTSTART:${format(data.startDate)}`,
    `DTEND:${format(data.endDate)}`,
    `LOCATION:${data.location}`,
    `DESCRIPTION:${data.description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')
}

/**
 * Generates a mailto: link for Email
 */
export const generateEmailString = (data: EmailData): string => {
  if (!data.email) return ''
  const params = new URLSearchParams()
  if (data.subject) params.append('subject', data.subject)
  if (data.body) params.append('body', data.body)
  const qs = params.toString()
  return `mailto:${data.email}${qs ? '?' + qs : ''}`
}

/**
 * Generates an sms: link for SMS
 */
export const generateSmsString = (data: SmsData): string => {
  if (!data.phone) return ''
  return `sms:${data.phone}${data.message ? '?body=' + encodeURIComponent(data.message) : ''}`
}

/**
 * Generates a GEO URI for Location (RFC 5870)
 * Format: geo:lat,lng - Opens native map apps (Google Maps, Apple Maps, etc.)
 * Supports offline viewing if user has downloaded the area.
 */
export const generateLocationString = (data: LocationData): string => {
  if (!data.lat || !data.lng) return ''

  if (data.useGoogleMaps) {
    return `https://www.google.com/maps?q=${data.lat},${data.lng}`
  }

  return `geo:${data.lat},${data.lng}`
}

/**
 * Helper to generate newline-separated content without the promotion footer
 */
export const generateCustomContent = (fields: CustomField[]): string => {
  return fields
    .filter((f) => f.value.trim())
    .map((f) => `${f.label || f.key}: ${f.value}`)
    .join('\n')
}
