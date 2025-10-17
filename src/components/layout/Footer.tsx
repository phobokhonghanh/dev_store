'use client';

import { Container, Title, Text, Group, ActionIcon, rem, SimpleGrid, Anchor } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          {/* Company Info */}
          <div>
            <Title order={3} className="text-white mb-4">
              ThạchCao<span className="text-blue-400">Pro</span>
            </Title>
            <Text size="sm" className="text-gray-400">
              Giải pháp toàn diện về trần và vách ngăn thạch cao chất lượng hàng đầu Việt Nam.
            </Text>
          </div>

          {/* Quick Links */}
          <div>
            <Title order={5} className="text-gray-300 mb-4 uppercase tracking-wider">Liên kết nhanh</Title>
            <Anchor href="#" className="block text-gray-400 hover:text-white text-sm mb-2">Về chúng tôi</Anchor>
            <Anchor href="#" className="block text-gray-400 hover:text-white text-sm mb-2">Dự án đã thực hiện</Anchor>
            <Anchor href="#" className="block text-gray-400 hover:text-white text-sm mb-2">Tuyển dụng</Anchor>
          </div>

          {/* Contact Info */}
          <div>
            <Title order={5} className="text-gray-300 mb-4 uppercase tracking-wider">Liên hệ</Title>
            <Group wrap="nowrap" gap="xs" className="mb-2">
              <IconMapPin size={16} className="text-blue-400" />
              <Text size="sm" className="text-gray-400">123 Đường ABC, Quận 1, TP. HCM</Text>
            </Group>
             <Group wrap="nowrap" gap="xs" className="mb-2">
              <IconPhone size={16} className="text-blue-400" />
              <Text size="sm" className="text-gray-400">(028) 3812 3456</Text>
            </Group>
             <Group wrap="nowrap" gap="xs">
              <IconMail size={16} className="text-blue-400" />
              <Text size="sm" className="text-gray-400">contact@thachcaopro.vn</Text>
            </Group>
          </div>
          
          {/* Social Media */}
           <div>
            <Title order={5} className="text-gray-300 mb-4 uppercase tracking-wider">Theo dõi chúng tôi</Title>
            <Group gap="xs">
              <ActionIcon size="lg" variant="default" radius="xl" component="a" href="#">
                <IconBrandTwitter size={18} />
              </ActionIcon>
              <ActionIcon size="lg" variant="default" radius="xl" component="a" href="#">
                <IconBrandYoutube size={18} />
              </ActionIcon>
              <ActionIcon size="lg" variant="default" radius="xl" component="a" href="#">
                <IconBrandInstagram size={18} />
              </ActionIcon>
            </Group>
          </div>
        </SimpleGrid>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <Text c="dimmed" size="sm">
            © {new Date().getFullYear()} ThachCaoPro. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
}
