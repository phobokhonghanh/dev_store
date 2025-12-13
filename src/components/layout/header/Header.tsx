'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconUser, IconLogout } from '@tabler/icons-react';
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
  Accordion,
} from '@mantine/core';
import classes from './header.module.css';
import { useAuth } from '@/hooks/contexts/auth';
import { accountLinks, headerLinks, userLinks } from './data'; 
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Header() {
  const [isOpen, { toggle, close }] = useDisclosure(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const mainItems = headerLinks.map((item) => {
    return (
      <Link key={item.label} href={item.link} className={classes.link}>
        {item.label}
      </Link>
    );
  });

  return (
    <Box pb={20}>
      {/* desktop */}
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Box style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>LOGO</Box>
          <Group gap={5} visibleFrom="sm">
            {mainItems}
          </Group>
          <Group visibleFrom="sm">
            {user ? (
              <Menu>
                <Menu.Target>
                  {/* Vòng tròn + tên user */}
                  <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconUser size={14} />
                    </div>
                    <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      Welcome, {user} 
                    </span>
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  {accountLinks.map(link => (
                    <Menu.Item
                      key={link.link}
                      color={link.color || 'default'}
                      style={{ textDecoration: 'none' }}
                          onClick={() => {
                            if (link.link.includes('logout')) {
                              logout();
                            } else {
                              router.push(link.link);
                            }
                          }}
                    >
                      {link.icon === 'user' && <IconUser size={14} style={{ marginRight: 4 }} />}
                      {link.icon === 'logout' && <IconLogout size={14} style={{ marginRight: 4 }} />}
                      {link.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                {userLinks.map((item) => (
                  <Button key={item.label} variant="default" component={Link} href={item.link}>{item.label}</Button>
                ))}
              </>
            )}
            <ThemeToggle />
          </Group>
          <Burger 
            opened={isOpen} 
            onClick={toggle} 
            hiddenFrom="sm" 
            size="sm" 
          />
        </Container>
      </header>
      {/* mobile */}
        <Drawer
          opened={isOpen}
          onClose={close}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
            <Accordion variant="transparent">
              {headerLinks.map((item) => {
                return (
                  <Link
                    href={item.link}
                    key={item.label}
                    className={classes.link}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </Accordion>
            <Divider my="sm" />
            <Group justify="center" grow pb="xl" px="md">
              {user ? (
                <>
                  {accountLinks.map(link => (
                    <Menu.Item
                      key={link.link}
                      color={link.color || 'default'}
                      style={{ textDecoration: 'none' }}
                          onClick={() => {
                            if (link.link.includes('logout')) {
                              logout();
                            } else {
                              router.push(link.link);
                            }
                          }}
                    >
                      {link.icon === 'user' && <IconUser size={14} style={{ marginRight: 4 }} />}
                      {link.icon === 'logout' && <IconLogout size={14} style={{ marginRight: 4 }} />}
                      {link.label}
                    </Menu.Item>
                  ))}
                </>
              ) : (
                userLinks.map((item) => (
                  <Button key={item.label} variant="default" component={Link} href={item.link}>{item.label}</Button>
                ))
              )}
            </Group>
          </ScrollArea>
        </Drawer>
    </Box>
  );
}
