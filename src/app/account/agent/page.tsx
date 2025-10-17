// src/app/register/page.tsx
'use client';

import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/constants/paths';

export default function AgentPage() {

  return (
    <Stack w={320} mx="auto" mt="xl">
      <Title order={2} ta="center">
        Agent Page
      </Title>
        <Button type="submit" mt="xl" fullWidth>
          Agent Page
        </Button>
    </Stack>
  );
}