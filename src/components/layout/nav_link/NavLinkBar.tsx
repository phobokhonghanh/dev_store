"use client";

import { Box, Burger, Drawer, NavLink, ScrollArea, rem } from "@mantine/core";
import Link from "next/link";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { NavRoute } from "./type";

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
    // 1. position: sticky giúp box bám lại trên màn hình khi cuộn
    // top: rem(20) tạo khoảng cách 20px so với mép trên cùng
    <Box style={{ position: 'sticky', top: rem(20) }}>

      {/* 2. ScrollArea giới hạn chiều cao (ví dụ: viewport height - 40px padding)
             type="hover" chỉ hiện thanh scroll khi di chuột vào giúp giao diện gọn hơn
             overscrollBehavior: 'contain' ngăn chặn việc cuộn trang chính khi danh sách cuộn kịch */}
      <ScrollArea
        h={`calc(100vh - ${rem(40)})`}
        type="hover"
        offsetScrollbars
        viewportProps={{ style: { overscrollBehavior: 'contain' } }}
      >
        {renderNav(data)}
      </ScrollArea>
    </Box>
  );
}