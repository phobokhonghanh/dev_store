// src/app/features/website/thach-cao-nguyen-phong/product/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
    AppShell, 
    Burger, 
    SimpleGrid, 
    Pagination, 
    Select,
    Box,
    rem,
    Text,
    Group,
    // Loader, // <-- Xóa
    // Alert,  // <-- Xóa
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { IconAlertCircle } from '@tabler/icons-react'; // <-- Xóa

// === IMPORT TỪ COMPONENT TÁI SỬ DỤNG ===
import { ProductCard } from '@/components/product/card';
import { FiltersSidebar } from '@/components/filter/Sidebar';
import { useProducts } from '@/hooks/product/useProduct';
// --- IMPORT COMPONENT MỚI ---
import { AsyncContentWrapper } from '@/components/common/AsyncContentWrapper';

// === IMPORT TỪ DATA CỤ THỂ CỦA TRANG ===
import { sortOptions } from './data';
import classes from './product.module.css';

const initialFilters = {
    categories: [],
    priceRange: undefined,
    rating: 0,
};

export default function ProductsPage() {
  const [opened, { toggle }] = useDisclosure();
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [filters, setFilters] = useState<any>(initialFilters);
  const [sortBy, setSortBy] = useState<string | null>('popular');
  const [activePage, setPage] = useState(1);
  
  const { products, totalPages, totalItems, isLoading, error } = useProducts({
    page: activePage,
    filters,
    sortBy,
  });

  useEffect(() => {
      setPage(1);
  }, [filters, sortBy]);

  if (!isClient) {
    return null; 
  }
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Main>
        <Box className={classes.mainContentHeader}>
            <Text fw={500}>
                Hiển thị {products.length} trên {totalItems} sản phẩm
            </Text>
            <Select
                placeholder="Sắp xếp theo"
                data={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                style={{ minWidth: rem(200) }}
            />
        </Box>

        {/* --- SỬ DỤNG WRAPPER MỚI --- */}
        <AsyncContentWrapper
          isLoading={isLoading}
          error={error}
          data={products}
          emptyMessage="Không tìm thấy sản phẩm nào phù hợp."
        >
          {/* Đây là phần 'children', sẽ tự động hiển thị khi có data */}
          <>
            <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} spacing="md">
              {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>

            <Group justify="center" mt="xl">
                <Pagination 
                    total={totalPages} 
                    value={activePage} 
                    onChange={setPage} 
                />
            </Group>
          </>
        </AsyncContentWrapper>
        {/* --- KẾT THÚC WRAPPER --- */}

      </AppShell.Main>
    </AppShell>
  );
}