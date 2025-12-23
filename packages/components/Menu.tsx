import Link from "next/link";
import { cn } from "@origini/libs/utils";
import type { Profile } from "@origini/profile";
import { originiProfile } from "@origini/profile";
import type { UrlsConfig } from "@origini/urls";
import { originiUrls } from "@origini/urls";

export type NavigationItem = {
  name: string;
  href: string;
};

/**
 * Helper function to create default navigation items from URLs
 */
export function createDefaultNavigation(urls: UrlsConfig): NavigationItem[] {
  return [
    { name: "Home", href: `/` },
    { name: "About", href: `/about` },
    { name: "Photos", href: urls.apps.photos },
    { name: "Insights", href: urls.apps.insights },
    { name: "CV", href: urls.apps.cv },
  ];
}

/**
 * Helper exports for common navigation items (for backward compatibility)
 * These now use the originiUrls configuration
 */
export const HOME = { name: "Home", href: originiUrls.apps.home };
export const ABOUT = { name: "About", href: `${originiUrls.apps.home}/about` };
export const INSIGHTS = { name: "Insights", href: originiUrls.apps.insights };
export const PHOTOS = { name: "Photos", href: originiUrls.apps.photos };
export const ARCHIVES = {
  name: "Archives",
  href: `${originiUrls.apps.blog}/archives`,
};
export const FEED = { name: "Feed", href: originiUrls.apps.blog };
export const BLOG = { name: "Blog", href: originiUrls.apps.blog };
export const CV = { name: "CV", href: originiUrls.apps.cv };

type Props = {
  /** Profile configuration (defaults to originiProfile) */
  profile?: Profile;
  /** URLs configuration (defaults to originiUrls) */
  urls?: UrlsConfig;
  /** Optional CSS classes */
  className?: string;
  /** Custom navigation items (if not provided, uses default from urls) */
  navigationItems?: NavigationItem[];
};

/**
 * Navigation menu component
 *
 * Displays navigation links based on URLs configuration.
 * Can accept custom navigation items or auto-generate from URLs.
 *
 * @example
 * ```tsx
 * import { Menu } from '@origini/components'
 * import { originiProfile } from '@origini/profile'
 * import { originiUrls } from '@origini/urls'
 *
 * <Menu profile={originiProfile} urls={originiUrls} />
 * ```
 */
export default function Menu({
  profile = originiProfile,
  urls = originiUrls,
  className,
  navigationItems,
}: Props) {
  // Use provided navigation items or generate from URLs
  const items = navigationItems ?? createDefaultNavigation(urls);
  return (
    <div
      className={cn(
        "flex flex-row gap-3 sm:gap-5 flex-wrap items-center",
        className,
      )}
    >
      {items.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className="text-sm sm:text-base text-neutral-900 dark:text-neutral-100 hover:underline underline-offset-8"
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
