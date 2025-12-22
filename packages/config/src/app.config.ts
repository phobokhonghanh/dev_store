/**
 * Application Configuration
 *
 * Centralized configuration for all apps in the monorepo.
 * Contains metadata, URLs, fonts, and other app-level settings.
 */

export interface AppMetadata {
  title: string;
  description: string;
  lang?: string;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    locale: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    images: string[];
    creator: string;
  };
  icons?: {
    icon: string;
    shortcut?: string;
    apple?: string;
  };
  manifest?: string;
}

export interface FontConfig {
  name: string;
  weights: readonly string[];
  subsets: readonly string[];
  variable: string;
  display: "auto" | "block" | "swap" | "fallback" | "optional";
}

export interface AppUrls {
  blog: string;
  cv: string;
  insights: string;
  home: string;
  photos: string;
  homelab: string;
}

// Environment-aware URL configuration
export const appUrls: AppUrls = {
  blog: process.env.NEXT_PUBLIC_BLOG_URL || "https://blog.origini.net",
  cv: process.env.NEXT_PUBLIC_CV_URL || "https://cv.origini.net",
  insights:
    process.env.NEXT_PUBLIC_INSIGHTS_URL || "https://insights.origini.net",
  home: process.env.NEXT_PUBLIC_HOME_URL || "https://origini.net",
  photos: process.env.NEXT_PUBLIC_PHOTOS_URL || "https://photos.origini.net",
  homelab: process.env.NEXT_PUBLIC_HOMELAB_URL || "https://homelab.origini.net",
};

// Blog app configuration
export const blogConfig = {
  metadata: {
    title: "Origini Din",
    description: "Data Engineer. I blog about Data Engineering and more",
    lang: "en",
  } as AppMetadata,
  fonts: {
    inter: {
      name: "Inter",
      weights: ["400", "700"] as const,
      subsets: ["latin", "vietnamese"] as const,
      variable: "--font-inter",
      display: "swap",
    } as const,
    libreBaskerville: {
      name: "Libre Baskerville",
      weights: ["400", "700"] as const,
      subsets: ["latin", "latin-ext"] as const,
      variable: "--font-serif",
      display: "swap",
    } as const,
  },
  fontFamily:
    "var(--font-inter), -apple-system, BlinkMacSystemFont, ui-sans-serif, system-ui, sans-serif",
};

// Insights app configuration
export const insightsConfig = {
  metadata: {
    title: "Insights | origini.net",
    description: "Insights for origini.net",
    lang: "en",
  } as AppMetadata,
  fonts: {
    inter: {
      name: "Inter",
      weights: ["100", "200", "300", "400", "700"] as const,
      subsets: ["latin"] as const,
      variable: "--font-sans",
      display: "swap",
    } as const,
  },
  header: {
    longText: "Insights",
    shortText: "Insights",
  },
};

// CV app configuration
export const cvConfig = {
  metadata: {
    title: "Origini Din - Résumé",
    description:
      "Data Engineer with 2+ years of experience in modern data warehousing, distributed systems, and cloud computing",
    lang: "en",
  } as AppMetadata,
  fonts: {
    inter: {
      name: "Inter",
      weights: ["400", "700"] as const,
      subsets: ["latin"] as const,
      variable: "--font-sans",
      display: "swap",
    } as const,
  },
};

// Home app configuration
export const homeConfig = {
  metadata: {
    title: "origini.net",
    description: "Personal website and URL shortener",
    lang: "en",
  } as AppMetadata,
  fonts: {
    inter: {
      name: "Inter",
      weights: ["400", "700"] as const,
      subsets: ["latin"] as const,
      variable: "--font-sans",
      display: "swap",
    } as const,
  },
};

// Photos app configuration
export const photosConfig = {
  metadata: {
    title: "Photos | origini.net",
    description: "Photography portfolio by Origini Din",
    lang: "en",
  } as AppMetadata,
  fonts: {
    inter: {
      name: "Inter",
      weights: ["400", "500", "600", "700"] as const,
      subsets: ["latin"] as const,
      variable: "--font-sans",
      display: "swap",
    } as const,
  },
};

// Homelab app configuration
// export const homelabConfig = {
//   metadata: {
//     title: "Homelab | origini.net",
//     description: "MicroK8s cluster monitoring dashboard - Real-time metrics, service status, and network analytics for a 5-node heterogeneous homelab",
//     lang: "en",
//     openGraph: {
//       title: "Homelab Dashboard | origini.net",
//       description: "MicroK8s cluster monitoring dashboard - Real-time metrics, service status, and network analytics",
//       url: "https://homelab.origini.net",
//       siteName: "origini.net",
//       images: [
//         {
//           url: "https://homelab.origini.net/og-image.svg",
//           width: 1200,
//           height: 630,
//           alt: "Homelab Dashboard - MicroK8s Cluster Monitoring",
//         },
//       ],
//       locale: "en_US",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Homelab Dashboard | origini.net",
//       description: "MicroK8s cluster monitoring - Real-time metrics and service status",
//       images: ["https://homelab.origini.net/og-image.svg"],
//       creator: "@originidev",
//     },
//     icons: {
//       icon: "/favicon.svg",
//       shortcut: "/favicon.svg",
//       apple: "/favicon.svg",
//     },
//     manifest: "/manifest.json",
//   } as AppMetadata,
//   fonts: {
//     inter: {
//       name: "Inter",
//       weights: ["100", "200", "300", "400", "700"] as const,
//       subsets: ["latin"] as const,
//       variable: "--font-sans",
//       display: "swap",
//     } as const,
//   },
//   header: {
//     longText: "Homelab Dashboard",
//     shortText: "Homelab",
//   },
// };

// Export all configs
export const appConfig = {
  urls: appUrls,
  blog: blogConfig,
  insights: insightsConfig,
  cv: cvConfig,
  home: homeConfig,
  photos: photosConfig,
  // homelab: homelabConfig,
};
