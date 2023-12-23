import { Product } from '../../domain/product.entity';

export interface IProductRepository {
  findByName(title: string): Promise<Product>;
  findById(id: number): Promise<Product>;
  save(product: Product): Promise<Product>;
  getAll(): Promise<Product[]>;
  getFilteredProducts(name:string): Promise<Product[]>;
}
