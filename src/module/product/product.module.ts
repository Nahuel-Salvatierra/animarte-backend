import { Module } from '@nestjs/common';
import { ProductService } from './app/service/product.service';
import { ProductController } from './interface/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/product.entity';
import { ProductRepository } from './infrastrucure/product.repository';
import { ImageModule } from '../image/image.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ImageModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
