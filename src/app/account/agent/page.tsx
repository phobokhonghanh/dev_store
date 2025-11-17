'use client';

import { Button, Stack, Title } from '@mantine/core';

/**
 * Renders the Agent Page component.
 */
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