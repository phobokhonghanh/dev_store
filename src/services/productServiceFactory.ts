import { ProductService } from './productService';
import { MockProductDataSource } from './data-sources/MockProductDataSource';
// import { RealProductDataSource } from './data-sources/RealProductDataSource'; // For future real API integration

export const createProductService = (): ProductService => {
  // In a real application, you would switch between data sources based on environment or configuration
  // For now, we'll always use the mock data source.
  const dataSource = new MockProductDataSource();
  // const dataSource = process.env.NODE_ENV === 'production' ? new RealProductDataSource() : new MockProductDataSource();

  return new ProductService(dataSource);
};

export const productService = createProductService();
