'use client';

import { useState, useEffect } from 'react';
import { 
    SimpleGrid, 
    Pagination, 
    Select,
    Box,
    rem,
    Text,
    Group,
    Container,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

// === IMPORT TỪ COMPONENT TÁI SỬ DỤNG ===
import { ProductCard } from '@/components/projects/product/card';
import { AsyncContentWrapper } from '@/components/common/AsyncContentWrapper';

// === IMPORT TỪ DATA CỤ THỂ CỦA TRANG ===
import { sortOptions } from '@/data/projects/san-pham/data';
import classes from './product.module.css';

import { Filters } from '@/types/types';

const initialFilters: Filters = {
    categories: [],
    priceRange: undefined,
    rating: 0,
};

/**
 * Renders the Products Page for 'San Pham', displaying a grid of products with filtering, sorting, and pagination.
 */
export default function ProductsPage() {
  const [scroll, scrollTo] = useWindowScroll();
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [filters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState<string | null>('popular');
  const [activePage, setPage] = useState(1);
  
  const { products, totalPages, totalItems, isLoading, error } = useProducts({
    page: activePage,
    filters,
    sortBy,
  });

  useEffect(() => {
    if (isClient) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePage, isClient]);

  /**
   * Handles the change of the pagination page.
   * Scrolls to the top of the window after changing the page.
   * @param page - The new page number.
   */
  const handlePageChange = (page: number) => {
    setPage(page);
    scrollTo({ y: 0 });
  };

  if (!isClient) {
    return null; 
  }
  return (
    <Container my="md">
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
                    onChange={handlePageChange} 
                />
            </Group>
          </>
        </AsyncContentWrapper>
        {/* --- KẾT THÚC WRAPPER --- */}

    </Container>
  );
}