import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box, Title, Text, Card, Group, Stack, Breadcrumbs, Anchor } from '@mantine/core';
import { AutoBreadcrumbs } from '@/components/layout/breadcrumb/AutoBreadcrumbs';
import { getBlogRoutes } from '@/components/layout/data/blogs';
import Markdown from 'react-markdown';
import { getContentBySlug } from '@/utils/common';

// Dynamic Route: Hứng tất cả các đường dẫn con của /blogs/
export default function BlogDynamicPage({ params }: { params: { slug: string[] } }) {
  // 1. Lấy dữ liệu dựa trên URL
  const result = getContentBySlug(params.slug);
  const blogRoutes = getBlogRoutes(); // Lấy route để render Breadcrumb đúng

  if (result.type === '404') {
    return notFound();
  }

  // TRƯỜNG HỢP 1: Hiển thị nội dung bài viết (Markdown)
  if (result.type === 'post') {
    const { data } = result;
    return (
      <Box p="md">
        <Box mb="sm">
          <AutoBreadcrumbs routes={blogRoutes} />
        </Box>
        <Title order={1} mb="md">{data.title}</Title>
        {data.date && <Text c="dimmed" size="sm" mb="xl">Publish Date: {new Date(data.date).toLocaleDateString()}</Text>}

        {/* Render Markdown Content */}
        <Box className="markdown-content">
          {/* Đây là nơi nội dung file MD hiển thị */}
          <Markdown>{data.content}</Markdown>
        </Box>
      </Box>
    );
  }

  // TRƯỜNG HỢP 2: Hiển thị danh sách Thư mục con & Bài viết (Folder View)
  if (result.type === 'folder') {
    const { folders, posts } = result.items;

    return (
      <Box p="md">
        <Box mb="sm">
          <AutoBreadcrumbs routes={blogRoutes} />
        </Box>

        {/* Hiển thị danh sách Folders con nếu có */}
        {folders.length > 0 && (
          <Box mb="xl">
            <Title order={4} mb="sm">Sub-categories</Title>
            <Stack>
              {folders.map(folder => (
                <Anchor component={Link} href={`/blogs/${folder.slug}`} key={folder.slug}>
                  📁 {folder.name}
                </Anchor>
              ))}
            </Stack>
          </Box>
        )}

        {/* Hiển thị danh sách Bài viết (.md) trong folder này */}
        <Title order={4} mb="sm">Posts</Title>
        {posts.length === 0 ? <Text c="dimmed">No posts found in this directory.</Text> : (
          <Stack>
            {posts.map(post => (
              <Card key={post.slug} shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{post.title}</Text>
                </Group>
                <Text size="sm" c="dimmed">{post.excerpt || 'Click to read more...'}</Text>
                <Anchor component={Link} href={`/blogs/${post.slug}`} mt="md" display="block">
                  Read more →
                </Anchor>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    );
  }
}