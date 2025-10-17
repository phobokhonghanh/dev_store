// src/app/forgot-password/page.tsx
'use client';

import { Button, Stack, TextInput, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function ForgotPasswordPage() {
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      console.log('Yêu cầu đặt lại mật khẩu cho email:', values.email);
      // GỌI API FORGOT-PASSWORD TỪ BACKEND CỦA BẠN Ở ĐÂY
      alert('Nếu email tồn tại, một liên kết đặt lại mật khẩu đã được gửi đến bạn.');
      form.reset();
    } catch (error) {
      console.error('Yêu cầu thất bại:', error);
      // Hiển thị thông báo lỗi
    }
  };

  return (
    <Stack w={320} mx="auto" mt="xl">
      <Title order={2} ta="center">
        Quên mật khẩu
      </Title>
      <Text c="dimmed" size="sm" ta="center">
        Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          mt="md"
          {...form.getInputProps('email')}
        />
        <Button type="submit" mt="xl" fullWidth>
          Gửi liên kết
        </Button>
      </form>
    </Stack>
  );
}