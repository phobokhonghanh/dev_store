"use client";

import { Box, Burger, Drawer, NavLink, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { navRoutes } from "./data/tools";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

function renderNav(items: any[], close?: () => void) {
  return items.map((item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.href}
        label={item.label}
        href={item.href}
        component={Link}
        defaultOpened={item.opened}
        leftSection={Icon ? <Icon size={16} stroke={1.5} /> : null}
        childrenOffset={28}
        onClick={close} // auto close mobile drawer
      >
        {item.children ? renderNav(item.children, close) : null}
      </NavLink>
    );
  });
}

export function NavLinkBar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, { toggle, close }] = useDisclosure(false);

  // ------------------------------
  // MOBILE VIEW
  // ------------------------------
  if (isMobile) {
    return (
      <>
        {/* Burger */}
        <Box p="xs">
          <Burger opened={opened} onClick={toggle} />
        </Box>

        {/* Drawer */}
        <Drawer opened={opened} onClose={close} size="75%" padding="md">
          <ScrollArea h="100vh">
            {renderNav(navRoutes, close)}
          </ScrollArea>
        </Drawer>
      </>
    );
  }

  // ------------------------------
  // DESKTOP VIEW
  // ------------------------------
  return (
    <Box>
      {renderNav(navRoutes)}
    </Box>
  );
}
