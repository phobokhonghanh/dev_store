'use client';

import {
  Container,
  Group,
  Burger,
  Menu,
  Button,
  Box,
  Drawer,
  ScrollArea,
  Divider,
  rem,
  Center,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './header.module.css';
import { mainLinks, userLinks } from './data'; // Import data

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const mainItems = mainLinks.map((item) => {
    if (item.links) {
      const menuItems = item.links.map((subItem) => (
        <Menu.Item key={subItem.link} component={Link} href={subItem.link}>
          {subItem.label}
        </Menu.Item>
      ));

      return (
        <Menu key={item.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a href={item.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{item.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={item.label} href={item.link} className={classes.link}>
        {item.label}
      </Link>
    );
  });

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          {/* Your Logo can go here */}
          <Box style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>LOGO</Box>
          <Group gap={5} visibleFrom="sm">
            {mainItems}
          </Group>
           <Group visibleFrom="sm">
            <Button variant="default" component={Link} href="/login">Đăng nhập</Button>
            <Button component={Link} href="/register">Đăng ký</Button>
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" size="sm" />
        </Container>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {mainLinks.map((item) => (
            <Link href={item.link} key={item.label} className={classes.link} onClick={closeDrawer}>
              {item.label}
            </Link>
          ))}
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            {userLinks.map((item) => (
              <Button key={item.label} variant="default" component={Link} href={item.link}>{item.label}</Button>
            ))}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}