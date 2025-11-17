'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Button, TextInput, PasswordInput, Stack, Title, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useLogin } from '@/hooks/auth/useLogin';
import { APP_ROUTES } from '@/constants';

/**
 * Renders the Login Page component.
 * Allows users to log in with their email and password.
 */
export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { handleLogin, isLoading, error } = useLogin();

  const form = useForm({
    initialValues: { identifier: '', password: '' },
    validate: {
      identifier: (value) => (value.length < 3 || value.length > 50 ? t('registerPage.validation.usernameLength') : null),
      password: (value) => (value.length < 3 || value.length > 50 ? t('registerPage.validation.passwordLength') : null),
    },
  });

  return (
    
    <Stack w={320} mx="auto" mt="xl">
      <Title order={2} ta="center">Login</Title>
      {/* {error && <Alert color="red">{error.message}</Alert>} */}
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
        <TextInput
          label="Username"
          placeholder="your_username"
          {...form.getInputProps('identifier')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          {...form.getInputProps('password')}
        />
        <Button type="submit" mt="xl" fullWidth loading={isLoading}>
          Sign in
        </Button>
      </form>
    </Stack>
  );
}