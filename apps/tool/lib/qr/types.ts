/**
 * QR Code Data Types
 * 
 * Centralized type definitions for all QR code data structures.
 * Used across forms, generators, builders, and API routes.
 */

// ============================================================================
// WIFI
// ============================================================================

/**
 * WiFi network configuration for QR code generation
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

// ============================================================================
// PAYMENT
// ============================================================================

/**
 * Bank transfer payment data for VietQR generation
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

// ============================================================================
// VCARD / CUSTOM FIELDS
// ============================================================================

/**
 * Custom key-value field (e.g., VCard fields)
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

// ============================================================================
// EVENT
// ============================================================================

/**
 * Calendar event data for iCal QR generation
 */
export interface EventData {
    title: string
    startDate: string
    endDate: string
    location: string
    locationLat?: string // NEW: Latitude for map
    locationLng?: string // NEW: Longitude for map
    useMap?: boolean // Toggle between map search and manual input
    description: string
}

// ============================================================================
// EMAIL
// ============================================================================

/**
 * Email data for mailto: QR generation
 */
export interface EmailData {
    email: string
    cc?: string
    bcc?: string
    subject: string
    body: string
}

// ============================================================================
// SMS
// ============================================================================

/**
 * SMS data for sms: QR generation
 */
export interface SmsData {
    phone: string
    message: string
}

// ============================================================================
// LOCATION
// ============================================================================

/**
 * Geographic location data for geo: QR generation
 */
export interface LocationData {
    lat: string
    lng: string
    useGoogleMaps?: boolean
}

// ============================================================================
// APP STORE
// ============================================================================

/**
 * App store links for mobile app QR generation
 */
export interface AppStoreData {
    iosUrl: string
    androidUrl: string
}

// ============================================================================
// URL / GENERIC
// ============================================================================

/**
 * Simple URL data
 */
export interface UrlData {
    url: string
}

/**
 * Union type of all QR data types
 */
export type QRData =
    | WiFiData
    | PaymentData
    | EventData
    | EmailData
    | SmsData
    | LocationData
    | AppStoreData
    | UrlData
    | { fields: CustomField[] }

export type QRType =
    | 'url'
    | 'wifi'
    | 'vcard'
    | 'payment'
    | 'event'
    | 'email'
    | 'sms'
    | 'location'
    | 'appstore'
