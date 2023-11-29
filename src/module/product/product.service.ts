import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from './product.repository.interface';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ImageService } from './image.service';
import { join } from 'path';
import * as fs from 'fs'
import { CreateProductDto } from './createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    @Inject(ImageService)
    private readonly productRepository: IProductRepository,
    private readonly imageService:ImageService) {}

  async create(createProductDto:CreateProductDto, image: Express.Multer.File,): Promise<Product> {

    const productFound = await this.productRepository.findByName(
      createProductDto.title,
    );
    if (productFound !== null) {
      throw new HttpException('Product already exist', HttpStatus.CONFLICT);
    }
    const imageFileName = this.imageService.renameImage(image.originalname)
    const newProduct = new Product();
    newProduct.title = createProductDto.title;
    newProduct.description = createProductDto.description;
    newProduct.price = Number(createProductDto.price);
    newProduct.image = imageFileName
    try {
      await this.imageService.save(imageFileName, image.buffer)
    } catch (error) {
      throw error
    }
    return await this.productRepository.save(newProduct);
  }

  async getAll():Promise<Product[]>{
    return await this.productRepository.getAll()
  }

  async getOne(id:number):Promise<Product>{
    return this.productRepository.findById(id)
  }
}
