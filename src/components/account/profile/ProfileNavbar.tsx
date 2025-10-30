// src/components/account/profile/ProfileNavbar.tsx
'use client';

import { NavLink } from '@mantine/core';
import { IconUserCircle, IconDevices } from '@tabler/icons-react';

interface ProfileNavbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const navItems = [
  {
    key: 'information',
    label: 'Thông tin cá nhân',
    icon: IconUserCircle,
  },
  {
    key: 'devices',
    label: 'Quản lý thiết bị',
    icon: IconDevices,
  },
  // Thêm các mục khác ở đây nếu cần
];

export function ProfileNavbar({ activeCategory, onCategoryChange }: ProfileNavbarProps) {
  return (
    <div>
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          href="#"
          active={item.key === activeCategory}
          label={item.label}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          onClick={(e) => {
            e.preventDefault();
            onCategoryChange(item.key);
          }}
        />
      ))}
    </div>
  );
}
