// src/components/common/AsyncContentWrapper.tsx
'use client';

import { Group, Loader, Alert, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface AsyncContentWrapperProps {
  isLoading: boolean;
  error: Error | null;
  data: any[]; // Mảng dữ liệu để kiểm tra (ví dụ: mảng products)
  children: ReactNode; // Nội dung sẽ hiển thị nếu thành công
  emptyMessage?: string; // Tùy chỉnh tin nhắn khi không có dữ liệu
}

export function AsyncContentWrapper({
  isLoading,
  error,
  data,
  children,
  emptyMessage = "Không tìm thấy dữ liệu nào phù hợp." // Tin nhắn mặc định
}: AsyncContentWrapperProps) {

  // 1. Trạng thái Đang Tải
  if (isLoading) {
    return <Group justify="center" mt="xl"><Loader /></Group>;
  }

  // 2. Trạng thái Lỗi
  if (error) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Lỗi!" color="red" mt="xl">
        Không thể tải dữ liệu. Vui lòng thử lại sau.
        {/* Bạn có thể thêm: {error.message} nếu muốn */}
      </Alert>
    );
  }

  // 3. Trạng thái Thành Công nhưng Rỗng
  if (data.length === 0) {
    return <Text ta="center" mt="xl">{emptyMessage}</Text>;
  }

  // 4. Trạng thái Thành Công (Có dữ liệu)
  // Render nội dung chính mà bạn truyền vào
  return <>{children}</>;
}