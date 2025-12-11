
import {
  Box,
  Text,
  Title,
} from '@mantine/core';
import { AutoBreadcrumbs } from '@/components/layout/breadcrumb/AutoBreadcrumbs';
import { getBlogRoutes } from '@/components/layout/data/blogs';

export default function BlogsPage() {
  const blogRoutes = getBlogRoutes();

  return (
    <Box p="md">
      <Box mb="sm">
        <AutoBreadcrumbs routes={blogRoutes} />
      </Box>
      <Box mb="md">
        <Title order={2} c="green">Search Blogs</Title>
        <Text c="dimmed" mt={4}>
          Welcome to Search Blogs in real time.
        </Text>
      </Box>      
    </Box>
  );
}
