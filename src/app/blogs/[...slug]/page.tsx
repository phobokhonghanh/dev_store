import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Title,
  Text,
  Card,
  Group,
  Stack,
  Anchor,
  SimpleGrid,
  ThemeIcon,
  Container,
} from '@mantine/core';
import { IconFolder, IconFileText, IconCalendar, IconChevronRight } from '@tabler/icons-react';
import Markdown from 'react-markdown';

// Import các hàm helper
import { getContentBySlug } from '@/utils/common';
import { getBlogRoutes } from '@/components/layout/data/blogs';
import { AutoBreadcrumbs } from '@/components/layout/breadcrumb/AutoBreadcrumbs';

// 1. Helper Format Label (Tự viết hoa chữ cái đầu)
function formatLabel(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 2. Props Definition (Next.js 15+ yêu cầu params là Promise)
interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function BlogDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const result = getContentBySlug(slug);
  const blogRoutes = getBlogRoutes();

  if (result.type === '404') {
    return notFound();
  }

  // --- TRƯỜNG HỢP 1: HIỂN THỊ NỘI DUNG BÀI VIẾT (.md) ---
  if (result.type === 'post') {
    const { data } = result;
    return (
      <Container size="lg" py="md">
        <Box mb="md">
          <AutoBreadcrumbs routes={blogRoutes} />
        </Box>

        <Box component="article">
          {data.date && (
            <Group gap={6} c="dimmed" justify="flex-end">
              <Text size="sm" fs="italic" c="inherit">
                Published: {new Date(data.date).toLocaleDateString()}
              </Text>
            </Group>
          )}

          <Box style={{ lineHeight: 1.7, fontSize: '1.05rem' }}>
            <Markdown>{data.content}</Markdown>

            {/* Empty State */}
            {data.content.length === 0 && (
              <Text c="dimmed" fs="italic" ta="center" py="xl">
                Nothing here.
              </Text>
            )}
          </Box>
        </Box>
      </Container>
    );
  }

  // --- TRƯỜNG HỢP 2: HIỂN THỊ DANH SÁCH THƯ MỤC (FOLDER VIEW) ---
  if (result.type === 'folder') {
    const { folders, posts } = result.items;
    const currentFolderTitle = slug[slug.length - 1];

    return (
      <Container size="lg" py="md">
        <Box mb="xl">
          <AutoBreadcrumbs routes={blogRoutes} />
        </Box>

        <Title order={2} mb="xs" c="green">
          {formatLabel(currentFolderTitle)}
        </Title>

        {/* --- SECTION: SUB-CATEGORIES (FOLDERS) --- */}
        {folders.length > 0 && (
          <Box mb="xl">
            <Title
              order={4}
              mb="md"
              c="inherit"
              fz="md"
              fw={700}
              style={{ letterSpacing: 1 }}
            >
              Folders
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {folders.map(folder => (
                <Anchor
                  component={Link}
                  href={`/blogs/${folder.slug}`}
                  key={folder.slug}
                  underline="never"
                >
                  <Card
                    shadow="xs"
                    padding="md"
                    radius="md"
                    withBorder
                    style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                  >
                    <Group>
                      <ThemeIcon color="yellow" variant="light" size="lg" radius="md">
                        <IconFolder size={20} stroke={1.5} />
                      </ThemeIcon>
                      <Text fw={600} size="md" c="inherit">
                        {formatLabel(folder.name)}
                      </Text>
                    </Group>
                  </Card>
                </Anchor>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* --- SECTION: POSTS (FILES) --- */}
        {posts.length > 0 && (
          <Box>
            <Title
              order={4}
              mb="md"
              c="inherit"
              fz="md"
              fw={700}
              style={{ letterSpacing: 1 }}
            >
              Articles
            </Title>
            <Stack gap="md">
              {posts.map(post => (
                <Anchor
                  component={Link}
                  href={`/blogs/${post.slug}`}
                  key={post.slug}
                  underline="never"
                >
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                  >
                    <Group align="flex-start" gap="md" wrap="nowrap">
                      <ThemeIcon color="blue" variant="light" size="lg" radius="md" mt={4}>
                        <IconFileText size={20} stroke={1.5} />
                      </ThemeIcon>

                      <Box style={{ flex: 1 }}>
                        <Group justify="space-between" align="center" mb={4}>
                          <Text fw={600} size="lg" c="inherit" style={{ lineHeight: 1.3 }}>
                            {formatLabel(post.title)}
                          </Text>
                          <IconChevronRight size={18} color="var(--mantine-color-dimmed)" />
                        </Group>

                        <Text size="sm" c="dimmed" lineClamp={2} mb={8}>
                          {post.excerpt || 'No description available for this article.'}
                        </Text>
                      </Box>
                    </Group>
                  </Card>
                </Anchor>
              ))}
            </Stack>
          </Box>
        )}

        {/* Empty State */}
        {folders.length === 0 && posts.length === 0 && (
          <Text c="dimmed" fs="italic" ta="center" py="xl">
            This directory is empty.
          </Text>
        )}
      </Container>
    );
  }
}