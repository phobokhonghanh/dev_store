/**
 * @origini/urls
 *
 * Unified URL and navigation configuration.
 * Single source of truth for all app URLs, external links, and navigation.
 *
 * This package eliminates the problem of URLs being defined in 5+ different places
 * by providing centralized configuration with environment variable support.
 *
 * @example
 * ```ts
 * import { originiUrls, createNavigation } from '@origini/urls'
 * import { originiProfile } from '@origini/profile'
 *
 * const navigation = createNavigation(originiUrls, originiProfile)
 * ```
 */

// Export all types
export type {
  AppUrls,
  ExternalUrls,
  UrlsConfig,
  NavLink,
  Navigation,
  DeepPartial,
} from "./types";

// Export utilities
export { createUrls, createNavigation, getAppUrls, getAppUrl } from "./utils";

// Export origini's configuration
export { originiUrls } from "./origini.urls";
export { originiUrls as defaultUrls } from "./origini.urls";
