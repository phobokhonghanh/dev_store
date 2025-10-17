'use client';

import { Button, TextInput, PasswordInput, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/contexts/auth';
import { PATHS } from '@/constants/paths';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // GỌI API LOGIN TỪ BACKEND CỦA BẠN
      // const response = await api.post('/auth/login', values);
      // const { token } = response.data;

      // Giả lập token
      const fakeToken = 'your-jwt-token-from-backend';
      login(fakeToken);

      router.push(PATHS.dashboard);
    } catch (error) {
      console.error('Login failed:', error);
      // Hiển thị thông báo lỗi bằng Mantine Notifications
    }
  };

  return (
    <Stack w={320} mx="auto" mt="xl">
      <Title order={2} ta="center">Login</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          {...form.getInputProps('password')}
        />
        <Button type="submit" mt="xl" fullWidth>
          Sign in
        </Button>
      </form>
    </Stack>
  );
}