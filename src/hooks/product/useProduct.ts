// src/hooks/useProducts.ts
import { PaginatedProducts, GetProductsParams } from '@/models/product';
import { productService } from '@/services/productService';
import { useState, useEffect } from 'react';

// Lấy PRODUCTS_PER_PAGE từ đây (hoặc từ API config)
const PRODUCTS_PER_PAGE = 12;

interface UseProductsParams {
    page: number;
    filters: any; // { categories, priceRange, rating }
    sortBy: string | null;
}

export const useProducts = ({ page, filters, sortBy }: UseProductsParams) => {
  const [data, setData] = useState<PaginatedProducts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      const params: GetProductsParams = {
        page,
        limit: PRODUCTS_PER_PAGE,
        sortBy,
        ...filters,
      };

      try {
        const result = await productService.getProducts(params);
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, filters, sortBy]); // Re-fetch khi các dependencies này thay đổi

  return {
    products: data?.data || [], // Trả về mảng sản phẩm
    totalPages: data?.totalPages || 1, // Trả về tổng số trang
    totalItems: data?.totalItems || 0, // Trả về tổng số sản phẩm
    isLoading,
    error,
  };
};