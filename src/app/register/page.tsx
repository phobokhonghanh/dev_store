'use client';

import { Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useRegister } from '@/hooks/auth/useRegister';

/**
 * Renders the Register Page component.
 * Allows users to create a new account.
 */
export default function RegisterPage() {
  const { t } = useTranslation('common');
  const { handleRegister, isLoading, error } = useRegister();

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      avatar: '',
    },
    validate: {
      username: (value) => (value.length < 3 || value.length > 50 ? t('registerPage.validation.usernameLength') : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('registerPage.validation.invalidEmail')),
      password: (value) => (value.length < 3 || value.length > 50 ? t('registerPage.validation.passwordLength') : null),
      confirmPassword: (value, values) =>
        value !== values.password ? t('registerPage.validation.passwordMismatch') : null,
      fullName: (value) => (value.length < 3 || value.length > 100 ? t('registerPage.validation.fullNameLength') : null),
    },
  });

  return (
    <Stack w={320} mx="auto" mt="xl">
      <Title order={2} ta="center">
        {t('registerPage.title')}
      </Title>
      
      <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
        {error && <Text c="red" size="sm" mt="xs">{error}</Text>}
        <TextInput label={t('registerPage.nameLabel')} placeholder={t('registerPage.namePlaceholder')} {...form.getInputProps('fullName')} />
        <TextInput
          label={t('registerPage.usernameLabel')}
          placeholder={t('registerPage.usernamePlaceholder')}
          mt="md"
          {...form.getInputProps('username')}
        />
        <TextInput
          label={t('registerPage.emailLabel')}
          placeholder={t('registerPage.emailPlaceholder')}
          mt="md"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label={t('registerPage.passwordLabel')}
          placeholder={t('registerPage.passwordPlaceholder')}
          mt="md"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label={t('registerPage.confirmPasswordLabel')}
          placeholder={t('registerPage.confirmPasswordPlaceholder')}
          mt="md"
          {...form.getInputProps('confirmPassword')}
        />
        <Button type="submit" mt="xl" fullWidth loading={isLoading}>
          {t('registerPage.submitButton')}
        </Button>
      </form>
    </Stack>
  );
}