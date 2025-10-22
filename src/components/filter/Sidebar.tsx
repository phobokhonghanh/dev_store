// src/components/filter/sidebar.tsx
'use client';

import { Accordion, Checkbox, Radio, Title, Stack, Button, Box, rem, Group, Text } from '@mantine/core';
import { IconFilter, IconStarFilled, IconX } from '@tabler/icons-react';
// Import data lọc từ file data.ts cùng cấp
import { filtersData } from './data'; 

// Props: state và hàm setState từ trang cha
interface FiltersSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  onClear: () => void;
}

export function FiltersSidebar({ filters, setFilters, onClear }: FiltersSidebarProps) {

  const handleCategoryChange = (value: string[]) => {
    setFilters({ ...filters, categories: value });
  };

  const handlePriceChange = (value: string) => {
    setFilters({ ...filters, priceRange: value });
  };

   const handleRatingChange = (value: string) => {
    setFilters({ ...filters, rating: value ? parseInt(value) : 0 });
  };
  
  return (
    <Stack>
      <Group justify='space-between' mb="md">
        <Group gap="xs">
            <IconFilter size={24} />
            <Title order={4}>Bộ Lọc Tìm Kiếm</Title>
        </Group>
         <Button 
            variant="transparent" 
            color="gray" 
            size="xs" 
            leftSection={<IconX size={14} />}
            onClick={onClear}
        >
            Xóa tất cả
        </Button>
      </Group>

      <Accordion defaultValue={['categories']} multiple>
        {/* Lọc theo Danh mục */}
        <Accordion.Item value="categories">
          <Accordion.Control>Theo Danh Mục</Accordion.Control>
          <Accordion.Panel>
            <Checkbox.Group
              value={filters.categories}
              onChange={handleCategoryChange}
            >
              <Stack mt="xs">
                {filtersData.categories.map((cat) => (
                  <Checkbox key={cat.value} label={cat.label} value={cat.value} />
                ))}
              </Stack>
            </Checkbox.Group>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Lọc theo Giá */}
        <Accordion.Item value="price">
          <Accordion.Control>Theo Khoảng Giá</Accordion.Control>
          <Accordion.Panel>
            <Radio.Group
                value={filters.priceRange}
                onChange={handlePriceChange}
            >
              <Stack mt="xs">
                {filtersData.priceRanges.map((range) => (
                  <Radio key={range.value} label={range.label} value={range.value} />
                ))}
              </Stack>
            </Radio.Group>
          </Accordion.Panel>
        </Accordion.Item>

         {/* Lọc theo Đánh giá */}
        <Accordion.Item value="rating">
          <Accordion.Control>Theo Đánh Giá</Accordion.Control>
          <Accordion.Panel>
            <Radio.Group
                value={filters.rating ? filters.rating.toString() : undefined}
                onChange={handleRatingChange}
            >
              <Stack mt="xs">
                {filtersData.ratings.map((rate) => (
                  <Radio 
                    key={rate.value} 
                    label={<Group gap="xs">
                        <IconStarFilled size={16} color='orange' />
                        <Text component='span' fw={500}>{rate.label}</Text>
                    </Group>} 
                    value={rate.value} 
                />
                ))}
              </Stack>
            </Radio.Group>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}