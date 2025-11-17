'use client';

import { useState } from 'react';
import { Grid, Group, Loader, Alert, Box, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { UserInfoCard } from '@/components/account/UserInfoCard';
import { ProfileNavbar } from '@/components/account/ProfileNavbar';
import { DeviceManagerCard } from '@/components/account/DeviceManagerCard';

import { useProfileData } from '@/hooks/account/useProfileData';

/**
 * Renders the user profile page, displaying user information and device management options.
 */
export default function ProfilePage() {
  const { data: user, loading, error } = useProfileData();

  const [activeCategory, setActiveCategory] = useState('information');

  /**
   * Renders the content based on the active category (information or devices).
   * Displays loading state, error messages, or relevant user data.
   */
  const renderContent = () => {
    if (loading) {
      return <Group justify="center" p="xl"><Loader /></Group>;
    }

    if (error || !user) {
      return (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Lỗi!" color="red" p="xl">
          {error || 'Không tìm thấy thông tin người dùng.'}
        </Alert>
      );
    }

    switch (activeCategory) {
      case 'information':
        return <UserInfoCard user={user} />;
      case 'devices':
        return <DeviceManagerCard devices={user} />;
      default:
        return <Text>Vui lòng chọn một mục từ menu.</Text>;
    }
  };

  return (
    <Box p="md">
        <Grid>
            {/* Cột bên trái cho Navbar */}
            <Grid.Col span={{ base: 12, md: 3 }}>
                <ProfileNavbar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </Grid.Col>

            {/* Cột bên phải cho nội dung */}
            <Grid.Col span={{ base: 12, md: 9 }}>
                {renderContent()}
            </Grid.Col>
        </Grid>
    </Box>
  );
}