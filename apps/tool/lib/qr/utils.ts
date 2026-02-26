import { generateVietQR, BANKS } from './vietqr'
import type {
    WiFiData,
    PaymentData,
    CustomField,
    EventData,
    EmailData,
    SmsData,
    LocationData,
    AppStoreData,
} from './types'

/**
 * Promotion footer added to generated text-based QR codes
 */
const QR_PROMOTION_TEXT = '\n\n---\nQR code by tuitenpho-tool.vercel.app'

// --- STRING GENERATORS (Raw QR Content) ---

/**
 * Generates a WiFi configuration string compatible with QR scanners
 */
export const generateWifiString = (data: WiFiData): string => {
    if (!data.ssid) return ''
    const p = data.encryption !== 'nopass' ? `P:${data.password};` : ''
    return `WIFI:T:${data.encryption};S:${data.ssid};${p}H:${data.hidden};;`
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
 */
export const generateEventString = (data: EventData): string => {
    if (!data.title) return ''

    // Format datetime to iCal format (YYYYMMDDTHHMMSSZ)
    const formatDateTime = (isoString: string): string => {
        try {
            const date = new Date(isoString)
            if (isNaN(date.getTime())) return ''
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
        } catch {
            return ''
        }
    }

    const dtStart = formatDateTime(data.startDate)
    const dtEnd = formatDateTime(data.endDate)

    if (!dtStart || !dtEnd) return ''

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//TuiTenPho Tools//QR Event Generator//EN', // REQUIRED by RFC 5545
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@tuitenpho-tool.vercel.app`, // Unique ID
        `DTSTAMP:${formatDateTime(new Date().toISOString())}`, // Creation timestamp
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${data.title}`,
        `LOCATION:${data.location}`,
        `DESCRIPTION:${data.description}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\n')
}

/**
 * Generates a mailto: link for Email
 */
export const generateEmailString = (data: EmailData): string => {
    if (!data.email) return ''

    const email = data.email || ''
    const cc = data.cc || ''
    const bcc = data.bcc || ''
    const subject = data.subject || ''
    const body = data.body || ''

    // Helper to encode properly (spaces as %20, not +)
    const encode = (str: string) => encodeURIComponent(str).replace(/\+/g, '%20')

    const parts = []
    if (cc) parts.push(`cc=${encode(cc)}`)
    if (bcc) parts.push(`bcc=${encode(bcc)}`)
    if (subject) parts.push(`subject=${encode(subject)}`)
    if (body) parts.push(`body=${encode(body)}`)

    return `mailto:${email}${parts.length ? '?' + parts.join('&') : ''}`
}

/**
 * Generates an sms: link for SMS
 */
export const generateSmsString = (data: SmsData): string => {
    if (!data.phone) return ''
    return `sms:${data.phone}${data.message ? '?body=' + encodeURIComponent(data.message) : ''}`
}

/**
 * Generates a GEO URI for Location
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

// --- DISPLAY GENERATORS (Human-Readable UI Content) ---

export const generateWifiDisplay = (data: WiFiData): string => {
    if (!data.ssid) return ''
    const parts = [`Network: ${data.ssid}`]
    if (data.encryption !== 'nopass' && data.password) {
        parts.push(`Password: ${data.password}`)
    }
    return parts.join('\n')
}

export const generateVCardDisplay = (fields: CustomField[]): string => {
    return generateCustomContent(fields)
}

export const generatePaymentDisplay = (data: PaymentData): string => {
    const parts = []
    const bank = BANKS.find((b) => b.bin === data.bankBin)
    if (bank) parts.push(`Bank: ${bank.shortName} (${bank.name})`)
    if (data.account) parts.push(`Account: ${data.account}`)
    if (data.name) parts.push(`Name: ${data.name}`)
    if (data.amount) parts.push(`Amount: ${data.amount}`)
    if (data.content) parts.push(`Content: ${data.content}`)
    return parts.join('\n')
}

export const generateEventDisplay = (data: EventData): string => {
    if (!data.title) return ''

    const formatDate = (iso: string) => {
        try {
            const d = new Date(iso)
            return isNaN(d.getTime()) ? iso : d.toLocaleString('vi-VN')
        } catch {
            return iso
        }
    }

    const parts = [
        `Event: ${data.title}`,
        `Start: ${formatDate(data.startDate)}`,
        `End: ${formatDate(data.endDate)}`,
    ]

    if (data.location) parts.push(`Location: ${data.location}`)
    if (data.description) parts.push(`Description: ${data.description}`)

    return parts.join('\n') + QR_PROMOTION_TEXT
}

export const generateEmailDisplay = (data: EmailData): string => {
    if (!data.email) return ''
    return `Email: ${data.email}\nSubject: ${data.subject}`
}

export const generateSmsDisplay = (data: SmsData): string => {
    if (!data.phone) return ''
    return `SMS: ${data.phone}\nMessage: ${data.message}`
}

export const generateLocationDisplay = (data: LocationData): string => {
    if (!data.lat || !data.lng) return ''
    return `GEO Coordinate: ${data.lat}, ${data.lng}`
}

export const generateAppStoreDisplay = (data: AppStoreData): string => {
    if (!data.iosUrl && !data.androidUrl) return ''
    return `iOS: ${data.iosUrl}\nAndroid: ${data.androidUrl}`
}
