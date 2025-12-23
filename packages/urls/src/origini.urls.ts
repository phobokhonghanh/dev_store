/**
 * origini's URL Configuration
 *
 * Default URL configuration for all apps in the monorepo.
 * Uses environment variables with fallbacks.
 *
 * This serves as both the production configuration and an example
 * for others who want to fork this monorepo.
 */

import type { UrlsConfig } from "./types";

/**
 * origini's default URL configuration
 *
 * Environment variable priority:
 * 1. NEXT_PUBLIC_origini_*_URL (specific to origini)
 * 2. NEXT_PUBLIC_APP_* (generic)
 * 3. Hardcoded fallback
 *
 * @example
 * ```ts
 * import { originiUrls } from '@origini/urls/origini'
 *
 * // Use in components
 * <Header urls={originiUrls} />
 * ```
 */
export const originiUrls: UrlsConfig = {
  apps: {
    blog:
      process.env.NEXT_PUBLIC_BLOG_URL ||
      process.env.NEXT_PUBLIC_APP_BLOG ||
      "https://blog.pho.net",
    cv:
      process.env.NEXT_PUBLIC_CV_URL ||
      process.env.NEXT_PUBLIC_APP_CV ||
      "https://cv.pho.net",
    insights:
      process.env.NEXT_PUBLIC_INSIGHTS_URL ||
      process.env.NEXT_PUBLIC_APP_INSIGHTS ||
      "https://insights.pho.net",
    home:
      process.env.NEXT_PUBLIC_HOME_URL ||
      process.env.NEXT_PUBLIC_APP_HOME ||
      "https://pho.net",
    photos:
      process.env.NEXT_PUBLIC_PHOTOS_URL ||
      process.env.NEXT_PUBLIC_APP_PHOTOS ||
      "https://photos.pho.net",
    homelab:
      process.env.NEXT_PUBLIC_HOMELAB_URL ||
      process.env.NEXT_PUBLIC_APP_HOMELAB ||
      "https://homelab.pho.net",
  },
  external: {
    // rust: "https://rust-tieng-viet.github.io",
    // clickhouse: "https://clickhouse-monitoring.vercel.app",
    // mcp: "https://mcp.pho.net",
    // monica: "https://monica.im/invitation?c=RJF8T7RT",
    // googleScript:
    //   "https://script.google.com/macros/s/AKfycbyRLwRpcBUlE1Iw2mhSN1zQNHLT7EQsnFVPaduKyEUJMQwaBhEuKXJfWjzUZc20F7sR/exec",
  },
};

/**
 * Export as default for convenience
 */
export default originiUrls;
