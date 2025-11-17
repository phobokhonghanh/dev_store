import { Product } from '../../models/Product';
import { ProductDataSource } from '../../models/interfaces/ProductDataSource';

// In a real application, you would fetch this JSON file.
// For this example, we'll simulate loading it.
const MOCK_PRODUCTS_JSON = `
[
  {
    "id": "1",
    "name": "Laptop XYZ",
    "description": "Powerful laptop for all your needs.",
    "price": 1200,
    "imageUrl": "https://via.placeholder.com/150"
  },
  {
    "id": "2",
    "name": "Smartphone ABC",
    "description": "Latest smartphone with amazing features.",
    "price": 800,
    "imageUrl": "https://via.placeholder.com/150"
  },
  {
    "id": "3",
    "name": "Headphones Pro",
    "description": "Noise-cancelling over-ear headphones.",
    "price": 250,
    "imageUrl": "https://via.placeholder.com/150"
  },
  {
    "id": "4",
    "name": "Smartwatch 2.0",
    "description": "Track your fitness and stay connected.",
    "price": 180,
    "imageUrl": "https://via.placeholder.com/150"
  }
]
`;

export class MockProductDataSource implements ProductDataSource {
  private products: Product[];

  constructor() {
    this.products = JSON.parse(MOCK_PRODUCTS_JSON).map((p: any) => new Product(p.id, p.name, p.description, p.price, p.imageUrl));
  }

  async getAllProducts(): Promise<Product[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.products), 500);
    });
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.products.find(product => product.id === id)), 500);
    });
  }
}
