import { Body, Controller, Get, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './image.helper';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @UseInterceptors(
    FileInterceptor(
      'image', {
        fileFilter:fileFilter
      }
    )
  )
  async create(@Body() createProductDto, @UploadedFile() image: Express.Multer.File,): Promise<Product> {
    return await this.productService.create(createProductDto, image);
  }

  @Get()
  async getAll():Promise<Product[]>{
    return await this.productService.getAll()
  }
}
