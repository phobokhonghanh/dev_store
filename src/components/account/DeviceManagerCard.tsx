// src/components/account/profile/DeviceManagerCard.tsx
'use client';

import { Text, Button, Card, Group, Badge, Stack, Box, Divider } from '@mantine/core';
import { IconDeviceDesktop, IconDeviceMobile, IconDeviceLaptop, IconAbc } from '@tabler/icons-react';
import type { Device } from '@/types/models/device';

export function DeviceManagerCard({ devices }: { devices: Device[] }) {
  const handleSignOutDevice = (deviceId: string) => {
    alert(`Yêu cầu đăng xuất cho thiết bị có ID: ${deviceId}`);
  };

  const formatLastSeen = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " ngày trước";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " giờ trước";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " phút trước";
    return "Vài giây trước";
  };

  const getDeviceIcon = (type: Device['type']) => {
    const iconProps = { size: "1.8rem", stroke: 1.5 };
    switch (type) {
      case 'desktop': return <IconDeviceDesktop {...iconProps} />;
      case 'mobile': return <IconDeviceMobile {...iconProps} />;
      case 'laptop': return <IconDeviceLaptop {...iconProps} />;
      default: return <IconAbc {...iconProps} />;
    }
  };

  return (
    <Card withBorder padding="xl" radius="md">
      <Stack gap="lg">
        {devices.map((device, index) => (
          <Box key={device.id}>
            <Group justify="space-between">
              <Group gap="lg">
                {getDeviceIcon(device.type)}
                <Stack gap={0}>
                  <Text fw={500}>{device.agent}</Text>
                  <Text size="sm" c="dimmed">
                    {device.isActive ? `IP: ${device.ip}` : `Lần cuối: ${formatLastSeen(device.lastSeen)}`}
                  </Text>
                </Stack>
              </Group>
              <Group>
                {device.isActive && (
                  <Badge color="green" variant="light" leftSection={<Box className="w-1.5 h-1.5 rounded-full bg-green-600" />}>
                    Đang hoạt động
                  </Badge>
                )}
                <Button variant="outline" color="red" size="xs" onClick={() => handleSignOutDevice(device.id)}>
                  Đăng xuất
                </Button>
              </Group>
            </Group>
            {index < devices.length - 1 && <Divider mt="lg" />}
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
