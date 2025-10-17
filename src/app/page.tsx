'use client';

// Các component từ Mantine
import { Container, Title, Text, Button, Group } from '@mantine/core';

// Các component layout đã được tách riêng
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    // Dùng Flexbox để layout chính dính vào Footer
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Phần nội dung chính chỉ có ở trang Home */}
      <main className="flex-grow">
        <Container size="lg" className="py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <Title
              order={1}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Xây dựng
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {' '}
                Tương Lai{' '}
              </span>
              của bạn
            </Title>
            <Text size="lg" mt="md" className="max-w-2xl mx-auto text-gray-600">
              Khám phá các công cụ và tài nguyên hàng đầu để biến ý tưởng của bạn
              thành hiện thực. Bắt đầu miễn phí và nâng cấp khi bạn phát triển.
            </Text>
            <Group mt="xl" justify="center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                radius="xl"
              >
                Bắt đầu ngay
              </Button>
              <Button size="lg" variant="default" radius="xl">
                Xem Demo
              </Button>
            </Group>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

