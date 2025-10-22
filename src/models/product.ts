// src/models/product.ts

/**
 * Định nghĩa cấu trúc dữ liệu cốt lõi cho một Sản phẩm.
 * Sẽ được sử dụng trong Components, Services, và Hooks.
 */
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  priceOld?: number;
  rating: number;
  sold: number;
  category: string;
}

/**
 * Định nghĩa cấu trúc dữ liệu trả về từ API khi gọi danh sách sản phẩm.
 */
export interface PaginatedProducts {
  data: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

/**
 * Định nghĩa các tham số (parameters) khi gọi API lấy sản phẩm.
 */
export interface GetProductsParams {
    page: number;
    limit: number;
    sortBy?: string | null;
    categories?: string[];
    priceRange?: string;
    rating?: number;
}