// 'use client';

// import { useRouter } from 'next/navigation';
// import { useTranslation } from 'react-i18next';

// import { Button, TextInput, PasswordInput, Stack, Title, Alert } from '@mantine/core';
// import { useForm } from '@mantine/form';

// import { useLogin } from '@/hooks/auth/useLogin';
// import { APP_ROUTES } from '@/constants';

// /**
//  * Renders the Login Page component.
//  * Allows users to log in with their email and password.
//  */
// export default function LoginPage() {
//   const router = useRouter();
//   const { t } = useTranslation('common');
//   const { handleLogin, isLoading, error } = useLogin();

//   const form = useForm({
//     initialValues: { identifier: '', password: '' },
//     validate: {
//       identifier: (value) => (value.length < 3 || value.length > 50 ? t('registerPage.validation.usernameLength') : null),
//       password: (value) => (value.length < 3 || value.length > 50 ? t('registerPage.validation.passwordLength') : null),
//     },
//   });

//   return (
    
//     <Stack w={320} mx="auto" mt="xl">
//       <Title order={2} ta="center">Login</Title>
//       {/* {error && <Alert color="red">{error.message}</Alert>} */}
//       <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
//         <TextInput
//           label="Username"
//           placeholder="your_username"
//           {...form.getInputProps('identifier')}
//         />
//         <PasswordInput
//           label="Password"
//           placeholder="Your password"
//           mt="md"
//           {...form.getInputProps('password')}
//         />
//         <Button type="submit" mt="xl" fullWidth loading={isLoading}>
//           Sign in
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
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

// Import đúng đường dẫn hook đã refactor
import { APP_ROUTES } from '@/constants';
import { LoginRequest } from '@/types/requests';
import { useLogin } from '@/hooks/auth/useLogin';

// Interface cho form values, khớp với LoginRequest
interface LoginFormValues extends LoginRequest {}

export default function LoginPage() {
  const { t } = useTranslation('common');
  const { handleLogin, isLoading, error } = useLogin();

  const form = useForm<LoginFormValues>({
    initialValues: {
      identifier: '',
      password: '',
    },
    validate: {
      identifier: (value) =>
        value.length < 3 ? t('loginPage.validation.usernameLength') : null,
      password: (value) =>
        value.length < 1 ? t('loginPage.validation.passwordRequired') : null,
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    handleLogin(values);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        {t('loginPage.title', { defaultValue: 'Welcome back!' })}
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        {t('loginPage.subtitle', { defaultValue: 'Login to your account' })}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {error && (
              <Text c="red" size="sm" ta="center">
                {error instanceof Error ? error.message : t('loginPage.alert.unknownError')}
              </Text>
            )}

            <TextInput
              label={t('loginPage.usernameLabel', { defaultValue: 'Username' })}
              placeholder={t('loginPage.usernamePlaceholder', { defaultValue: 'Your username' })}
              withAsterisk
              autoComplete="username"
              {...form.getInputProps('username')}
            />

            <PasswordInput
              label={t('loginPage.passwordLabel', { defaultValue: 'Password' })}
              placeholder={t('loginPage.passwordPlaceholder', { defaultValue: 'Your password' })}
              withAsterisk
              mt="md"
              autoComplete="current-password"
              {...form.getInputProps('password')}
            />

            <Button type="submit" mt="xl" fullWidth loading={isLoading}>
              {t('loginPage.submitButton', { defaultValue: 'Sign in' })}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Text ta="center" mt="md">
        {t('loginPage.noAccount')}{' '}
        <Anchor component={Link} href={APP_ROUTES.REGISTER?.pattern} fw={700}>
          {t('loginPage.registerLink', { defaultValue: 'Create account' })}
        </Anchor>
      </Text>
    </Container>
  );
}