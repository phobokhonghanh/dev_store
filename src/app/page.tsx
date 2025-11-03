'use client';

// Các component từ Mantine
import { Container, Title, Text, Button, Group } from '@mantine/core';

// Các component layout đã được tách riêng
import { Welcome } from '@/components/welcome/Welcome';
import { Box } from '@mantine/core';

export default function HomePage() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Welcome />
      </Box>
    </Box>
  );
}