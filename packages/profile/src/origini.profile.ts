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
    name: "Phở",
    shortName: "pho",
    email: "pho@gmail.com",
    title: "Data Engineer",
    bio: "Data Engineering, Rustacean at night",
    experience: "2+ years",
    location: "Vietnam",
  },

  social: {
    github: "https://github.com/phobokhonghanh/",
    twitter: "https://x.com/",
    linkedin: "https://www.linkedin.com/in/phobo/",
    unsplash: "https://unsplash.com/",
    tiktok: "https://www.tiktok.com/",
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
