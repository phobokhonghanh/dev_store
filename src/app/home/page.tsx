'use client';



import { Welcome } from '@/components/home/Welcome';
// Các component layout đã được tách riêng
import { Box } from '@mantine/core';

/**
 * Renders the Home Page, displaying a welcome message.
 */
export default function HomePage() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Welcome />
      </Box>
    </Box>
  );
}