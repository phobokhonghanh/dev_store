import { Product } from '../models/Product';
import { ProductDataSource } from '../models/interfaces/ProductDataSource';

export class ProductService implements ProductDataSource {
  private dataSource: ProductDataSource;

  constructor(dataSource: ProductDataSource) {
    this.dataSource = dataSource;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.dataSource.getAllProducts();
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.dataSource.getProductById(id);
  }
}