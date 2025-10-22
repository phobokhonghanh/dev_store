// src/components/common/ThemeToggle.tsx
'use client';

import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './themeToggle.module.css';

export function ThemeToggle() {
  // Hook chính để lấy hành động
  const { setColorScheme } = useMantineColorScheme();
  
  // Hook này đọc giá trị hiện tại (tự động theo hệ thống hoặc do người dùng chọn)
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1} />
    </ActionIcon>
  );
}