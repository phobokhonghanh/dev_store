'use client';

import { useState, useEffect } from 'react';
import { SimpleGrid, Card, Image, Text, TextInput, Pagination, Group, Container, LoadingOverlay } from '@mantine/core';
import Link from 'next/link';

import classes from './projects.module.css';



import { projectsData } from '../../data/projects/projects-data';

import { useProjects } from '@/services/ProjectService';

const projects = projectsData;

/**
 * Renders the Projects Page, displaying a list of projects with search and pagination.
 */
export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [activePage, setPage] = useState(1);


// ... (rest of the file)



// ... (rest of the file)

  const { projects: data, pageCount, error, isLoading } = useProjects({ page: activePage, search });

  /**
   * Handles the change of the pagination page.
   * @param page - The new page number.
   */
  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProjects = data?.projects.filter((project: any) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container my="md">
      <LoadingOverlay visible={isLoading} />
      <TextInput
        placeholder="Tìm kiếm dự án"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        mb="md"
      />
      <SimpleGrid cols={3}>
        {filteredProjects?.map((project: any) => (
          <Link href={project.link} key={project.name} style={{ textDecoration: 'none' }}>
            <Card shadow="sm" p="lg" className={classes.card}>
              <Card.Section>
                <Image src={project.logo} height={160} alt={project.name} />
              </Card.Section>

              <Text weight={500} size="lg" mt="md">
                {project.name}
              </Text>

              <Text mt="xs" color="dimmed" size="sm">
                {project.description.length > 100 ? (
                  <>
                    {`${project.description.slice(0, 100)}... `}
                    <Text component="span" color="blue" size="sm">xem thêm</Text>
                  </>
                ) : (
                  project.description
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
