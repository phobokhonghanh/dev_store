// src/components/layout/notification/Notification.tsx
import { notifications } from '@mantine/notifications';
import { Text, Group, rem, MantineColor } from '@mantine/core';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
}

const notificationConfig: Record<NotificationType, { Icon: typeof IconCheck; color: MantineColor }> = {
  success: { Icon: IconCheck, color: 'teal' },
  error: { Icon: IconX, color: 'red' },
  info: { Icon: IconInfoCircle, color: 'blue' },
};

function Notification({ type, title, message }: NotificationProps) {
  const { Icon, color } = notificationConfig[type];
  return (
    <Group wrap="nowrap" p="md">
      <Icon style={{ width: rem(20), height: rem(20) }} color={color} />
      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500} c={color}>
          {title}
        </Text>
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
          {message}
        </Text>
      </div>
    </Group>
  );
}

export const showNotification = ({ type, title, message }: NotificationProps) => {
  notifications.show({
    message: (
      <Notification
        type={type}
        title={title}
        message={message}
      />
    ),
  
    style: { padding: 0 },
    withCloseButton: true,
    autoClose: 5000,
  
    color: 'gray',
  });
};