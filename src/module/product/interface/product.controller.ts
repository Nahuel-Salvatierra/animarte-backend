import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from '../app/service/product.service';
import { Product } from '../domain/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../../image/image.helper';
import { join } from 'path';
import { Response } from 'express';
import { CreateProductDto } from '../app/dto/createProduct.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Get('/image/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', '..', 'upload', imageName);
    res.sendFile(imagePath);
  }

  @Post('/create')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilter,
    }),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Product> {
    return await this.productService.create(createProductDto, image);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.productService.getOne(+id);
  }

  @Get('/category/:name')
  async getFilteredProducts(@Param('name') name: string) {
    console.log(name)
    return await this.productService.getFilteredProducts(name);
  }
}
