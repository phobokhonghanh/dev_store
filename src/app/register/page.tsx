// 'use client';

// import { Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { useTranslation } from 'react-i18next';
// import { useRegister } from '@/hooks/auth/useRegister';

// /**
//  * Renders the Register Page component.
//  * Allows users to create a new account.
//  */
// export default function RegisterPage() {
//   const { t } = useTranslation('common');
//   const { handleRegister, isLoading, error } = useRegister();

//   const form = useForm({
//     initialValues: {
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       fullName: '',
//       avatar: '',
//     },
//     validate: {
//       username: (value) => (value.length < 3 || value.length > 50 ? t('registerPage.validation.usernameLength') : null),
//       email: (value) => (/^\S+@\S+$/.test(value) ? null : t('registerPage.validation.invalidEmail')),
//       password: (value) => (value.length < 3 || value.length > 50 ? t('registerPage.validation.passwordLength') : null),
//       confirmPassword: (value, values) =>
//         value !== values.password ? t('registerPage.validation.passwordMismatch') : null,
//       fullName: (value) => (value.length < 3 || value.length > 100 ? t('registerPage.validation.fullNameLength') : null),
//     },
//   });

//   return (
//     <Stack w={320} mx="auto" mt="xl">
//       <Title order={2} ta="center">
//         {t('registerPage.title')}
//       </Title>
      
//       <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
//         {error && <Text c="red" size="sm" mt="xs">{error}</Text>}
//         <TextInput label={t('registerPage.nameLabel')} placeholder={t('registerPage.namePlaceholder')} {...form.getInputProps('fullName')} />
//         <TextInput
//           label={t('registerPage.usernameLabel')}
//           placeholder={t('registerPage.usernamePlaceholder')}
//           mt="md"
//           {...form.getInputProps('username')}
//         />
//         <TextInput
//           label={t('registerPage.emailLabel')}
//           placeholder={t('registerPage.emailPlaceholder')}
//           mt="md"
//           {...form.getInputProps('email')}
//         />
//         <PasswordInput
//           label={t('registerPage.passwordLabel')}
//           placeholder={t('registerPage.passwordPlaceholder')}
//           mt="md"
//           {...form.getInputProps('password')}
//         />
//         <PasswordInput
//           label={t('registerPage.confirmPasswordLabel')}
//           placeholder={t('registerPage.confirmPasswordPlaceholder')}
//           mt="md"
//           {...form.getInputProps('confirmPassword')}
//         />
//         <Button type="submit" mt="xl" fullWidth loading={isLoading}>
//           {t('registerPage.submitButton')}
//         </Button>
//       </form>
//     </Stack>
//   );
// }

'use client';

import { 
  Anchor, 
  Button, 
  Container, 
  Paper, 
  PasswordInput, 
  Text, 
  TextInput, 
  Title, 
  Stack 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants';
import { RegisterRequest } from '@/types/requests';
import { useRegister } from '@/hooks/auth/useRegister';

// Định nghĩa kiểu dữ liệu cho Form (bao gồm cả trường confirmPassword phục vụ UI)
interface RegisterFormValues extends RegisterRequest {
  confirmPassword?: string;
}

export default function RegisterPage() {
  const { t } = useTranslation('common');
  const { handleRegister, isLoading, error } = useRegister();

  const form = useForm<RegisterFormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      avatar: '',
    },
    validate: {
      username: (value) => 
        (value.length < 3 || value.length > 50 ? t('registerPage.validation.usernameLength') : null),
      email: (value) => 
        (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : t('registerPage.validation.invalidEmail')),
      password: (value) => 
        (value.length < 6 ? t('registerPage.validation.passwordMinLength') : null),
      confirmPassword: (value, values) =>
        value !== values.password ? t('registerPage.validation.passwordMismatch') : null,
      fullName: (value) => 
        (value.length < 2 ? t('registerPage.validation.fullNameLength') : null),
    },
  });

  // Handler xử lý submit: Loại bỏ confirmPassword trước khi gửi API
  const handleSubmit = (values: RegisterFormValues) => {
    const { confirmPassword, ...requestData } = values;
    handleRegister(requestData);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        {t('registerPage.title')}
      </Title>
      
      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        {t('registerPage.subtitle', { defaultValue: 'Create a new account' })}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {error && (
              <Text c="red" size="sm" ta="center">
                {error instanceof Error ? error.message : t('registerPage.alert.unknownError')}
              </Text>
            )}

            <TextInput 
              label={t('registerPage.nameLabel')} 
              placeholder={t('registerPage.namePlaceholder')} 
              withAsterisk
              {...form.getInputProps('fullName')} 
            />
            
            <TextInput
              label={t('registerPage.usernameLabel')}
              placeholder={t('registerPage.usernamePlaceholder')}
              withAsterisk
              autoComplete="username"
              {...form.getInputProps('username')}
            />
            
            <TextInput
              label={t('registerPage.emailLabel')}
              placeholder={t('registerPage.emailPlaceholder')}
              withAsterisk
              autoComplete="email"
              {...form.getInputProps('email')}
            />
            
            <PasswordInput
              label={t('registerPage.passwordLabel')}
              placeholder={t('registerPage.passwordPlaceholder')}
              withAsterisk
              autoComplete="new-password"
              {...form.getInputProps('password')}
            />
            
            <PasswordInput
              label={t('registerPage.confirmPasswordLabel')}
              placeholder={t('registerPage.confirmPasswordPlaceholder')}
              withAsterisk
              autoComplete="new-password"
              {...form.getInputProps('confirmPassword')}
            />

            <Button type="submit" fullWidth mt="xl" loading={isLoading}>
              {t('registerPage.submitButton')}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Text ta="center" mt="md">
        {t('registerPage.alreadyHaveAccount')}{' '}
        <Anchor component={Link} href={APP_ROUTES.LOGIN.pattern} fw={700}>
          {t('registerPage.loginLink')}
        </Anchor>
      </Text>
    </Container>
  );
}