import {
  IconFingerprint,
  IconMoodSmile,
  IconSearch,
} from "@tabler/icons-react";
import { NavRoute, RawNav } from "../nav_link/type";


// raw structure: clean, no repeating path
const rawRoutes: RawNav[] = [
  {
    label: "Search",
    slug: "tools",
    icon: <IconSearch size={16} stroke={1.5} />,
  },
  {
    label: "Premium",
    slug: "premium",
    opened: false,  
    icon: <IconFingerprint size={16} stroke={1.5} />,
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
    icon: <IconMoodSmile size={16} stroke={1.5} />,
    opened: true,  
    children: [
      { label: "Countdown Timer", slug: "countdown-timer" },
      { label: "QR Code Generator", slug: "qrcode" },
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

export const toolsRoutes: NavRoute[] = buildRoutes(rawRoutes);
