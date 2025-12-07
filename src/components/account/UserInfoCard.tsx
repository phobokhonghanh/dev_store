'use client';

import { useState } from 'react';
import { Avatar, Text, Card, Group, Stack, Title, Button, TextInput, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { User } from '@/types/models/user';

/**
 * Renders a card displaying user information and allows editing of certain fields.
 */
export function UserInfoCard({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    initialValues: {
      name: user.name,
      phone: user.phone,
      // Thêm các trường khác có thể chỉnh sửa ở đây
    },

    validate: {
      name: (value) => (value.length < 2 ? 'Tên phải có ít nhất 2 ký tự' : null),
      phone: (value) => (/^\d{10}$/.test(value) ? null : 'Số điện thoại không hợp lệ'),
    },
  });

  /**
   * Handles saving the edited user information.
   * Only sends changed fields to the backend.
   * @param values - The current form values.
   */
  const handleSave = (values: typeof form.values) => {
    const dirtyFields: Partial<typeof values> = {};

    // Chỉ lấy các trường đã bị thay đổi (actioned)
    if (form.isDirty('name')) {
      dirtyFields.name = values.name;
    }
    if (form.isDirty('phone')) {
      dirtyFields.phone = values.phone;
    }

    if (Object.keys(dirtyFields).length > 0) {
      alert('Đang lưu các trường đã thay đổi:\n' + JSON.stringify(dirtyFields, null, 2));
      // Trong thực tế, bạn sẽ gọi API để cập nhật chỉ các trường này
      // await api.updateUser(user.id, dirtyFields);
    } else {
      alert('Không có gì thay đổi để lưu.');
    }

    setIsEditing(false);
  };

  /**
   * Handles canceling the editing process.
   * Resets the form to its initial values.
   */
  const handleCancel = () => {
    form.reset(); // Reset lại các thay đổi
    setIsEditing(false);
  };

  return (
    <Card withBorder padding="xl" radius="md">
      <form onSubmit={form.onSubmit(handleSave)}>
        <Group justify="space-between" align="flex-start" mb="md">
            <Title order={4}>Thông tin chung</Title>
            {!isEditing ? (
                <Button variant="light" size="xs" onClick={() => setIsEditing(true)}>
                    Chỉnh sửa
                </Button>
            ) : (
                <Group>
                    <Button variant="default" size="xs" onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button type="submit" size="xs">
                        Lưu thay đổi
                    </Button>
                </Group>
            )}
        </Group>

        <Group align="flex-start">
          <Avatar src={user.avatar} size={120} radius="50%" alt={`${user.name}'s avatar`} />
          <Box style={{ flex: 1 }}>
            <Stack gap="md">
              {isEditing ? (
                <TextInput
                  label="Họ và tên"
                  placeholder="Nhập họ và tên của bạn"
                  {...form.getInputProps('name')}
                />
              ) : (
                <Box>
                    <Text fz="sm" c="dimmed">Họ và tên</Text>
                    <Text>{form.values.name}</Text>
                </Box>
              )}

              {isEditing ? (
                <TextInput
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại của bạn"
                  {...form.getInputProps('phone')}
                />
              ) : (
                <Box>
                    <Text fz="sm" c="dimmed">Số điện thoại</Text>
                    <Text>{form.values.phone}</Text>
                </Box>
              )}

                <Box>
                    <Text fz="sm" c="dimmed">Email (không thể thay đổi)</Text>
                    <Text>{user.email}</Text>
                </Box>
                <Box>
                    <Text fz="sm" c="dimmed">Ngày sinh (không thể thay đổi)</Text>
                    <Text>{new Date(user.birthday).toLocaleDateString('vi-VN')}</Text>
                </Box>
            </Stack>
          </Box>
        </Group>
      </form>
    </Card>
  );
}