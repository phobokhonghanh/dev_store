"use client";

import { Anchor, Breadcrumbs, Group, NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavRoute } from "../nav_link/type";
import { navRoutes } from "../nav_link/data/tools";

/**
 * Tìm đường dẫn từ root → đến route hiện tại
 */
function findPath(
  pathname: string,
  routes: NavRoute[],
  trail: NavRoute[] = []
): NavRoute[] | null {
  for (const item of routes) {
    const newTrail = [...trail, item];

    if (item.href === pathname) return newTrail;

    if (item.children) {
      const found = findPath(pathname, item.children, newTrail);
      if (found) return found;
    }
  }

  return null;
}

export function AutoBreadcrumbs() {
  const pathname = usePathname();

  const trail: NavRoute[] = findPath(pathname, navRoutes) ?? [];

  return (
    <Breadcrumbs>
      {
        trail.map((item) => {
        const Icon = item.icon;
        return (
          <Anchor
            key={item.href}
            component={Link}
            href={item.href}
            c="inherit"                // kế thừa màu
            underline="never"         // tắt underline
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none", // cho chắc
            }}
          >
            <Group gap={6} align="center">
              {Icon ? <Icon size={16} stroke={1.5} /> : null}
              <span>{item.label}</span>
            </Group>
          </Anchor>
          );
        })
      }
    </Breadcrumbs>
  );
}
