import {
  IconHome2,
  IconFingerprint,
  IconMoodSmile,
} from "@tabler/icons-react";
import { NavRoute } from "../type";

type RawNav = {
  label: string;
  base?: string;
  icon?: any;
  slug?: string;
  opened?: boolean;   // ⬅ thêm vào đây
  children?: RawNav[];
};


// raw structure: clean, no repeating path
const rawRoutes: RawNav[] = [
  {
    label: "Home Tools",
    slug: "tools", // homepage
    icon: IconHome2,
  },
  {
    label: "Premium",
    slug: "premium",
    opened: false,  
    icon: IconFingerprint,
    children: [
      { label: "First tools", slug: "first" },
      { label: "Second tools", slug: "second" },
      {
        label: "Premium parent",
        slug: "parent",
        opened: true,
        children: [
          { label: "First tools", slug: "1" },
          { label: "Second tools", slug: "2" },
          { label: "Third tools", slug: "3" },
        ],
      },
    ],
  },
  {
    label: "Free",
    slug: "tools/free",
    icon: IconMoodSmile,
    opened: true,  
    children: [
      { label: "First tools", slug: "first" },
      { label: "Second tools", slug: "second" },
      { label: "Third tools", slug: "third" },
      // thêm countdown timer
      { label: "Countdown Timer", slug: "countdown-timer" },
    ],
  },
];

// build full paths automatically
function buildRoutes(nav: RawNav[], parent = ""): NavRoute[] {
  return nav.map((item): NavRoute => {
    const currentPath =
      parent === "" ? `/${item.slug ?? ""}` : `${parent}/${item.slug}`;

    return {
      label: item.label,
      icon: item.icon,
      href: currentPath === "/" ? "/" : currentPath,
      opened: item.opened ?? false,
      children: item.children ? buildRoutes(item.children, currentPath) : undefined,
    };
  });
}

export const navRoutes: NavRoute[] = buildRoutes(rawRoutes);
