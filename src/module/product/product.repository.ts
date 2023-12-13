import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';
import { IProductRepository } from './product.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  repository: Repository<Product>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Product);
  }

  async findByName(title: string): Promise<Product> {
    return await this.repository.findOne({ where: { title } });
  }

  async findById(id: number): Promise<Product> {
    return await this.repository.findOne({ where: { id } });
  }

  async save(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return this.repository.find({ relations: { category: true } });
  }

  async getFilteredProducts(name: string):Promise<Product[]> {
    return this.repository.find({ where: { category: { name } } });
  }
}
