'use client';

import { useState, useEffect } from 'react';
import { SimpleGrid, Card, Image, Text, TextInput, Pagination, Group, Container, LoadingOverlay } from '@mantine/core';
import Link from 'next/link';

import classes from './tools.module.css';

import { useTools } from '@/services/ToolService';



/**
 * Renders the Tools Page, displaying a list of tools with search and pagination.
 */
export default function ToolsPage() {
  const [search, setSearch] = useState('');
  const [activePage, setPage] = useState(1);


// ... (rest of the file)



// ... (rest of the file)

  const { tools: data, pageCount, error, isLoading } = useTools({ page: activePage, search });

  /**
   * Handles the change of the pagination page.
   * @param page - The new page number.
   */
  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTools = data?.tools.filter((tool: any) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container my="md">
      <LoadingOverlay visible={isLoading} />
      <TextInput
        placeholder="Tìm kiếm công cụ"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        mb="md"
      />
      <SimpleGrid cols={3}>
        {filteredTools?.map((tool: any) => (
          <Link href={tool.link} key={tool.name} style={{ textDecoration: 'none' }}>
            <Card shadow="sm" p="lg" className={classes.card}>
              <Card.Section>
                <Image src={tool.logo} height={160} alt={tool.name} />
              </Card.Section>

              <Text weight={500} size="lg" mt="md">
                {tool.name}
              </Text>

              <Text mt="xs" color="dimmed" size="sm">
                {tool.description.length > 100 ? (
                  <>
                    {`${tool.description.slice(0, 100)}... `}
                    <Text component="span" color="blue" size="sm">xem thêm</Text>
                  </>
                ) : (
                  tool.description
                )}
              </Text>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
      <Group position="center" mt="md">
        <Pagination page={activePage} onChange={handlePageChange} total={pageCount} />
      </Group>
    </Container>
  );
}
