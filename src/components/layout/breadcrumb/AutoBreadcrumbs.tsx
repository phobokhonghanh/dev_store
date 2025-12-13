"use client";

import { Anchor, Breadcrumbs, Group } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavRoute } from "@/components/layout/nav_link/type"; // Sử dụng absolute import

interface AutoBreadcrumbsProps {
  routes: NavRoute[];
}

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

    // So sánh chính xác hoặc startsWith nếu cần logic active parent
    // Lưu ý: item.href có thể là "/" nên cần check kỹ để tránh match nhầm
    if (item.href === pathname) return newTrail;

    if (item.children) {
      const found = findPath(pathname, item.children, newTrail);
      if (found) return found;
    }
  }

  return null;
}

export function AutoBreadcrumbs({ routes }: AutoBreadcrumbsProps) {
  const pathname = usePathname();

  // Truyền routes từ props vào hàm tìm kiếm
  const trail: NavRoute[] = findPath(pathname, routes) ?? [];

  if (trail.length === 0) return null; // Ẩn nếu không tìm thấy đường dẫn

  return (
    <Breadcrumbs mb="md">
      {trail.map((item) => {
        return (
          <Anchor
            key={item.href}
            component={Link}
            href={item.href}
            c="inherit"
            underline="never"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            <Group gap={6} align="center">
              {/* Render icon object */}
              {item.icon}
              <span>{item.label}</span>
            </Group>
          </Anchor>
        );
      })}
    </Breadcrumbs>
  );
}