"use client";

import { Box, Burger, Drawer, NavLink, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { NavRoute } from "./type"; // Import type vừa tạo

// Props interface
interface NavLinkBarProps {
  data: NavRoute[];
}

function renderNav(items: NavRoute[], close?: () => void) {
  return items.map((item) => {

    return (
      <NavLink
        key={item.href}
        label={item.label}
        href={item.href}
        component={Link}
        defaultOpened={item.opened}
        leftSection={item.icon}
        childrenOffset={28}
        onClick={close} // auto close mobile drawer
      >
        {item.children ? renderNav(item.children, close) : null}
      </NavLink>
    );
  });
}

export function NavLinkBar({ data }: NavLinkBarProps) {
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
            {renderNav(data, close)}
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
      {renderNav(data)}
    </Box>
  );
}