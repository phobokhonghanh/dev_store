'use client';

import {
  Text,
  Group,
  Box,
} from '@mantine/core';
import classes from './contact.module.css';

// Component con để hiển thị thông tin, không thay đổi
export function ContactInfoItem({ icon: Icon, title, description }: { icon: React.FC<{ style: { width: number; height: number; }; }>; title: string; description:string }) {
  return (
    <Group wrap="nowrap" align="flex-start" mt="md">
      <Box className={classes.iconWrapper}>
        <Icon style={{ width: 22, height: 22 }} />
      </Box>
      <div>
        <Text fz="lg" fw={700} className={classes.contactTitle}>
          {title}
        </Text>
        <Text fz="sm" c="dimmed">
          {description}
        </Text>
      </div>
    </Group>
  );
}
