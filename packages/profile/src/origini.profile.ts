/**
 * origini Le's Profile Configuration
 *
 * This is the default profile used across all apps.
 * It serves as both the production configuration and an example
 * for others who want to fork this monorepo.
 */

import type { Profile } from "./index";

/**
 * origini Le's complete profile
 *
 * @example
 * ```ts
 * import { originiProfile } from '@origini/profile/origini'
 *
 * // Use in components
 * <Header profile={originiProfile} />
 * ```
 */
export const originiProfile: Profile = {
  personal: {
    name: "origini Le",
    shortName: "Duyệt",
    email: "me@origini.net",
    title: "Sr. Data Engineer",
    bio: "Data Engineering, Rustacean at night",
    experience: "6+ years",
    location: "Vietnam",
  },

  social: {
    github: "https://github.com/origini",
    twitter: "https://x.com/_origini",
    linkedin: "https://linkedin.com/in/origini",
    unsplash: "https://unsplash.com/@_origini",
    tiktok: "https://www.tiktok.com/@origini.net",
  },

  appearance: {
    avatar: "/avatar.jpg",
    favicon: "/favicon.ico",
    theme: {
      // Claude-inspired color palette
      primary: "#f5dcd0", // Claude peach
      secondary: "#a8d5ba", // Claude mint
      accent: "#c5c5ff", // Claude lavender

      // Extended palette (used in home page cards)
      coral: "#ff9999", // Coral
      yellow: "#f0d9a8", // Soft yellow
      sky: "#b3d9ff", // Sky blue
    },
  },
};

/**
 * Export as default for convenience
 */
export default originiProfile;
