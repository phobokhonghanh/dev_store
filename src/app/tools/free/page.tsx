'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  LoadingOverlay,
  Text,
  Title,
} from '@mantine/core';

import { AutoBreadcrumbs } from '@/components/layout/breadcrumb/AutoBreadcrumbs';

export default function ToolsFreePage() {
  const [isLoading] = useState(false);

  return (
    <Box p="md">
      <LoadingOverlay visible={isLoading} />
      <Box mb="sm">
        <AutoBreadcrumbs />
      </Box>
      <Box mb="md">
        <Title order={2} c="green">Home Free Tools</Title>
        <Text c="dimmed" mt={4}>
          Welcome to Home Free Tools in real time.
        </Text>
      </Box>      
    </Box>
  );
}
