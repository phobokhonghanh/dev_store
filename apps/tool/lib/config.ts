/**
 * Core application configuration
 * Contains all default values and system-wide settings
 */
export const CONFIG = {
  /** Default coordinates when geolocation fails or is denied */
  DEFAULT_LAT: 0,
  DEFAULT_LNG: 0,

  /** API Endpoints */
  NOMINATIM_URL: 'https://nominatim.openstreetmap.org/search',

  /** Map settings */
  MAP: {
    DEFAULT_ZOOM: 13,
    USER_AGENT: 'DevStoreQR/1.0',
  },

  /** Geolocation settings */
  GEOLOCATION: {
    TIMEOUT: 10000, // 10 seconds
    MAX_AGE: 300000, // 5 minutes cache
    HIGH_ACCURACY: true,
  },

  /** QR Code API Base URL */
  API_BASE: 'https://tuitenpho-tool.vercel.app/api/qrcode',
} as const

/** Supported language codes */
export type SupportedLocale = 'vi' | 'en'

/** Default locale */
export const DEFAULT_LOCALE: SupportedLocale = 'vi'
