import React from 'react';
import { Tabs, Box } from '@mantine/core';

export interface TabItem {
  value: string;         // ID của tab (vd: 'url', 'wifi')
  label: string;         // Tên hiển thị (vd: 'URL', 'WiFi')
  icon?: React.ReactNode; // Icon (tùy chọn)
  content: React.ReactNode; // Nội dung React Component bên trong panel
}

interface DynamicTabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  grow?: boolean; // Tùy chọn tabs có giãn đều không
}

export default function DynamicTabs({ 
  items, 
  defaultValue, 
  onChange, 
  grow = true 
}: DynamicTabsProps) {
  // Nếu không có defaultValue, lấy tab đầu tiên
  const initialTab = defaultValue || items[0]?.value;

  return (
    <Tabs 
      defaultValue={initialTab} 
      onChange={(value) => value && onChange?.(value)} 
      variant="default" 
      radius="md"
    >
      <Tabs.List grow={grow}>
        {items.map((item) => (
          <Tabs.Tab 
            key={item.value} 
            value={item.value} 
            leftSection={item.icon}
          >
            {item.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <Box mt="md">
        {items.map((item) => (
          <Tabs.Panel key={item.value} value={item.value}>
            {item.content}
          </Tabs.Panel>
        ))}
      </Box>
    </Tabs>
  );
}