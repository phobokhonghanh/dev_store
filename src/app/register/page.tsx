// src/app/register/page.tsx
'use client';

import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/constants/paths';

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Tên phải có ít nhất 2 ký tự' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ'),
      password: (value) => (value.length < 6 ? 'Mật khẩu phải có ít nhất 6 ký tự' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Mật khẩu không khớp' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      console.log('Đăng ký với:', { name: values.name, email: values.email });
      // GỌI API REGISTER TỪ BACKEND CỦA BẠN Ở ĐÂY
      // Sau khi đăng ký thành công, chuyển hướng đến trang đăng nhập
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      router.push(PATHS.login);
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      // Hiển thị thông báo lỗi
    }
  };

  return (
    <Stack w={320} mx="auto" mt="xl">
      <Title order={2} ta="center">
        Tạo tài khoản
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Tên của bạn" placeholder="John Doe" {...form.getInputProps('name')} />
        <TextInput
          label="Email"
          placeholder="your@email.com"
          mt="md"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Mật khẩu"
          placeholder="Mật khẩu của bạn"
          mt="md"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu"
          mt="md"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit" mt="xl" fullWidth>
          Đăng ký
        </Button>
      </form>
    </Stack>
  );
}