'use client';

import { useState } from 'react';
import {
  Box,
  LoadingOverlay,
  Text,
  Title,
} from '@mantine/core';
import { AutoBreadcrumbs } from '@/components/layout/breadcrumb/AutoBreadcrumbs';
import { toolsRoutes } from "@/components/layout/data/tools"; // Import data tools

export default function ToolsPage() {
  const [isLoading] = useState(false);

  return (
    <Box p="md">
      <LoadingOverlay visible={isLoading} />
      <Box mb="sm">
        <AutoBreadcrumbs routes={toolsRoutes} />
      </Box>
      <Box mb="md">
        <Title order={2} c="green">Search Tools</Title>
        <Text c="dimmed" mt={4}>
          Welcome to Search Tools in real time.
        </Text>
      </Box>      
    </Box>
  );
}
