// src/services/productService.ts
import { GetProductsParams, PaginatedProducts, Product } from '@/models/product';
import apiClient from './apiClient';

// Hàm helper để build query string
const buildQueryString = (params: GetProductsParams) => {
    const query = new URLSearchParams({
        page: params.page.toString(),
        limit: params.limit.toString(),
    });

    if (params.sortBy) {
        query.append('sortBy', params.sortBy);
    }
    if (params.rating && params.rating > 0) {
        query.append('rating', params.rating.toString());
    }
    if (params.priceRange) {
        query.append('priceRange', params.priceRange);
    }
    if (params.categories && params.categories.length > 0) {
        params.categories.forEach(cat => query.append('category', cat));
    }
    
    return query.toString();
};


// export const productService = {
//   getProducts: async (params: GetProductsParams): Promise<PaginatedProducts> => {
//     // Giả sử API endpoint của bạn là '/products'
//     const queryString = buildQueryString(params);
//     const response = await apiClient.get(`/products?${queryString}`);
    
//     // Giả sử API của bạn trả về data theo cấu trúc PaginatedProducts
//     // Nếu không, bạn cần điều chỉnh lại cho đúng
//     return response.data;
//   },
// };

import { allProducts } from './data/product';

export const productService = {
  
    // --- THAY THẾ HÀM NÀY ---
    getProducts: async (params: GetProductsParams): Promise<PaginatedProducts> => {

    console.log("--- ĐANG DÙNG MOCK SERVICE VỚI PARAMS: ---", params);

    // 1. Tạo độ trễ giả lập mạng
    await new Promise(resolve => setTimeout(resolve, 500)); // Giả lập 500ms
    
    let filteredProducts: Product[] = [...allProducts]; 

    // 2. Tái tạo logic Filter (Giống hệt useMemo ở code cũ)
    // Lọc theo Category
    if (params.categories && params.categories.length > 0) {
        const categoriesToFilter = params.categories;
        filteredProducts = filteredProducts.filter(p => categoriesToFilter.includes(p.category));
    }
    // Lọc theo Giá
    if (params.priceRange) {
        const [min, max] = params.priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(p => p.price >= min && (max ? p.price <= max : true));
    }
    // Lọc theo Rating
    if (params.rating && params.rating > 0) {
        const ratingToFilter = params.rating;
        filteredProducts = filteredProducts.filter(p => p.rating >= ratingToFilter);
    }

    // 3. Tái tạo logic Sort (Giống hệt useMemo ở code cũ)
    switch (params.sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => Number(b.id) - Number(a.id));
            break;
        case 'popular':
        default:
            filteredProducts.sort((a, b) => b.sold - a.sold);
            break;
    }

    // 4. Tái tạo logic Paginate
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / params.limit);
    const page = params.page || 1;
    const limit = params.limit || 12;

    const paginatedData = filteredProducts.slice(
        (page - 1) * limit,
        page * limit
    );

    // 5. Trả về kết quả đúng cấu trúc PaginatedProducts
    const mockResponse: PaginatedProducts = {
        data: paginatedData,
        totalPages: totalPages,
        totalItems: totalItems,
        currentPage: page,
    };

    return mockResponse;
  },
};