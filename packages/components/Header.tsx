import Link from "next/link";
import { cn } from "@origini/libs/utils";
import type { Profile } from "@origini/profile";
import { originiProfile } from "@origini/profile";
import type { UrlsConfig } from "@origini/urls";
import { originiUrls } from "@origini/urls";

import Menu, { type NavigationItem } from "./Menu";
import Container from "./Container";
import Logo from "./Logo";

interface HeaderProps {
  /** Profile configuration (defaults to originiProfile) */
  profile?: Profile;
  /** URLs configuration (defaults to originiUrls) */
  urls?: UrlsConfig;
  /** Show logo */
  logo?: boolean;
  /** Short text (overrides profile.personal.shortName) */
  shortText?: string;
  /** Long text (overrides profile.personal.title) */
  longText?: string;
  /** Center layout */
  center?: boolean;
  /** Navigation items (if not provided, Menu will use default) */
  navigationItems?: NavigationItem[];
  /** Optional CSS classes */
  className?: string;
  /** Container CSS classes */
  containerClassName?: string;
}

/**
 * Header component with logo, branding, and navigation
 *
 * Accepts profile and URL configuration to display personalized branding.
 * Falls back to origini's profile if none provided.
 *
 * @example
 * ```tsx
 * import { Header } from '@origini/components'
 * import { originiProfile } from '@origini/profile'
 * import { originiUrls } from '@origini/urls'
 *
 * <Header profile={originiProfile} urls={originiUrls} />
 * ```
 */
export default function Header({
  profile = originiProfile,
  urls = originiUrls,
  logo = true,
  shortText,
  longText,
  center = false,
  navigationItems,
  className,
  containerClassName,
}: HeaderProps) {
  // Use profile defaults if not overridden
  const displayShortText = shortText ?? profile.personal.shortName;
  const displayLongText = longText ?? profile.personal.title;
  return (
    <header
      className={cn(
        "py-10 bg-background",
        center ? "md:flex md:justify-center" : "",
        className,
      )}
    >
      <Container className={cn("mb-0", containerClassName)}>
        <nav
          className={cn(
            "flex items-center flex-wrap justify-between transition-all gap-4",
            center && "md:flex-col md:gap-10",
          )}
        >
          <div className={cn("flex flex-row items-center gap-2")}>
            {logo && (
              <Logo
                className={center ? "md:flex-col" : ""}
                logoClassName={center ? "md:w-40 md:h-40" : ""}
              />
            )}

            <Link
              href={urls.apps.home}
              className={cn(
                "font-serif text-xl sm:text-2xl font-normal text-neutral-900 dark:text-neutral-100",
                className,
              )}
            >
              {displayShortText && displayLongText ? (
                <>
                  {/* <span className="block sm:hidden">{displayShortText}</span> */}
                  <span
                    className={cn(
                      "hidden sm:block",
                      center && "md:text-7xl md:mt-5",
                    )}
                  >
                    {displayLongText}
                  </span>
                </>
              ) : (
                <span>{displayShortText || displayLongText}</span>
              )}
            </Link>
          </div>

          <Menu
            profile={profile}
            urls={urls}
            navigationItems={navigationItems}
          />
        </nav>
      </Container>
    </header>
  );
}
