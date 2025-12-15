import {
  Box,
  Text,
  Title
} from '@mantine/core';

import { AutoBreadcrumbs } from '@/components/layout/breadcrumb/AutoBreadcrumbs';
import { toolsRoutes } from '@/components/layout/data/tools';

export default function ToolsFreePage() {
  return (
    <Box p="md">
      <Box mb="sm">
        <AutoBreadcrumbs routes={toolsRoutes} />
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
