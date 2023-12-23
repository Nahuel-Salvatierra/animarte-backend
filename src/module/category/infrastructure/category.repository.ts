import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../app/repository/category.repository.interface';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../domain/category.entity';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  repository: Repository<Category>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(Category);
  }

  async save(category: Category): Promise<Category> {
    const newCategory = this.repository.create(category);
    return await this.repository.save(newCategory);
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findOne({ where: { name } });
  }

  async getAll(): Promise<Category[]> {
    return await this.repository.find();
  }

  async getById(id: number): Promise<Category> {
    return await this.repository.findOne({
      where: { id },
      relations: { products: true },
    });
  }
}
