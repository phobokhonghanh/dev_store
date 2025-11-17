import { Product } from '../Product';

export interface ProductDataSource {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
}
