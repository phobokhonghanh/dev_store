// src/app/profile/page.tsx
'use client';

// Component từ Mantine
import { Card, Avatar, Text, Group, Button } from '@mantine/core';

export default function ProfilePage() {
  return (
    // Sử dụng Tailwind để tạo layout và căn giữa trang
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      
      {/* Component Card của Mantine */}
      {/* Sử dụng Tailwind để giới hạn chiều rộng và thêm bóng đổ */}
      <Card withBorder padding="xl" radius="md" className="max-w-sm w-full shadow-lg">
        <Card.Section
          // Tailwind class để tạo nền gradient
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-28"
        />
        <Avatar
          src="https://i.pravatar.cc/150"
          size={80}
          radius={80}
          // Tailwind class để tạo viền và định vị avatar
          className="-mt-10 mx-auto border-4 border-white"
        />
        
        {/* Tailwind class để căn giữa text và tạo khoảng cách */}
        <Text ta="center" fz="lg" fw={500} mt="sm">
          Jane Doe
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          Fullstack Developer
        </Text>
        
        {/* Component Group của Mantine để nhóm các button */}
        {/* Tailwind class để căn giữa và tạo khoảng cách */}
        <Group mt="md" justify="center" gap="xs">
          <Button radius="xl" variant="default">
            Gửi tin nhắn
          </Button>
          <Button radius="xl" className="bg-blue-500">
            Theo dõi
          </Button>
        </Group>
      </Card>
    </div>
  );
}