import { useAuth } from '@/hooks/contexts/auth';
import { Menu, Avatar, Text, Group, Button } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';

export function HeaderUserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Group style={{ cursor: 'pointer' }}>
          <Avatar color="blue" radius="xl" size={30}>
            <IconUser size={16} />
          </Avatar>
          <Text lineClamp={1} style={{ maxWidth: 100 }}>
            {user}
          </Text>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
        <Link href="/user/info" passHref legacyBehavior>
            <Group style={{ cursor: 'pointer' }}>
            <IconUser size={14} />
            <span>Profile</span>
            </Group>
        </Link>
        </Menu.Item>
        <Menu.Item color="red" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
