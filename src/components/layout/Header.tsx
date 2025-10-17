'use client';

import { Container, Title, Group, Button, Menu, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';

const features = [
  { label: 'Trần Thạch Cao', link: '#' },
  { label: 'Vách Ngăn Thạch Cao', link: '#' },
  { label: 'Sản Phẩm Chống Cháy', link: '#' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const featureItems = features.map((item) => (
    <Menu.Item key={item.label} component="a" href={item.link}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <Container size="xl" className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <Title order={3} className="text-gray-800 font-bold">
            ThạchCao<span className="text-blue-600">Pro</span>
          </Title>
        </Link>

        {/* Navigation Links for Desktop */}
        <Group gap="xl" className="hidden sm:flex">
          <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Trang Chủ
          </Link>
          <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
              <a href="#" className="flex items-center text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                Sản phẩm & Dịch vụ
                <IconChevronDown size={14} className="ml-1" />
              </a>
            </Menu.Target>
            <Menu.Dropdown>{featureItems}</Menu.Dropdown>
          </Menu>
          <Link href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Dự Án
          </Link>
           <Link href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Liên Hệ
          </Link>
        </Group>

        {/* Action Buttons for Desktop */}
        <Group className="hidden sm:flex">
          <Button component={Link} href="/login" variant="default">
            Đăng nhập
          </Button>
          <Button component={Link} href="/register" className="bg-blue-600 hover:bg-blue-700">
            Đăng ký
          </Button>
        </Group>

        {/* Burger Menu for Mobile */}
        <Burger opened={opened} onClick={toggle} className="sm:hidden" size="sm" />
        {/* TODO: Add Drawer/Modal for mobile navigation */}
      </Container>
    </header>
  );
}
