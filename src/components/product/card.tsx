// src/components/product/card.tsx
'use client';

import { Card, Image, Text, Group, Rating, Badge, Box, Stack, rem } from '@mantine/core';
import Link from 'next/link';
// Import CSS module từ chính thư mục này
import classes from './product.module.css'; 
import { Product } from '@/services/productService';

// Hàm format tiền tệ (cho đẹp)
function formatCurrency(price: number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}


export function ProductCard({ product }: { product: Product }) {
  const discount = (product.priceOld && product.priceOld > 0) 
    ? Math.round(((product.priceOld - product.price) / product.priceOld) * 100) 
    : 0;

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder className={classes.card} component={Link} href={`/products/${product.id}`}>
      <Card.Section>
        <Image
          src={product.image}
          height={200}
          alt={product.name}
        />
        {/* Badge giảm giá */}
        {discount > 0 && (
            <Badge color="red" variant="filled" className={classes.discountBadge}>
                {discount}% GIẢM
            </Badge>
        )}
      </Card.Section>

      <Stack justify="space-between" mt="md" mb="xs" gap="xs">
        {/* Tên sản phẩm (giới hạn 2 dòng) */}
        <Text fw={500} className={classes.productName}>
            {product.name}
        </Text>

        {/* Giá */}
        <Box>
            <Text fz="lg" fw={700} c="red.6">
                {formatCurrency(product.price)}
            </Text>
            {product.priceOld && (
                <Text fz="sm" c="dimmed" td="line-through">
                    {formatCurrency(product.priceOld)}
                </Text>
            )}
        </Box>
      </Stack>

      {/* Đánh giá và Đã bán (chuẩn Shopee) */}
      <Group justify="space-between" fz="sm" c="dimmed">
        <Rating value={product.rating} fractions={2} readOnly size="sm" />
        <Text>
            Đã bán {product.sold > 1000 ? (product.sold / 1000).toFixed(1) + 'k' : product.sold}
        </Text>
      </Group>
    </Card>
  );
}