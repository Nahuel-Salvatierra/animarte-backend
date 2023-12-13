import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from './product.repository.interface';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ImageService } from '../image/image.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    @Inject(ImageService)
    private readonly productRepository: IProductRepository,
    private readonly imageService: ImageService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<Product> {
    const productFound = await this.productRepository.findByName(
      createProductDto.title,
    );
    if (productFound !== null) {
      throw new HttpException('Product already exist', HttpStatus.CONFLICT);
    }
    const category = await this.categoryService.getByName(
      createProductDto.category,
    );

    if (category) {
      const imageFileName = this.imageService.renameImage(image.originalname);
      const newProduct = new Product();
      newProduct.title = createProductDto.title;
      newProduct.description = createProductDto.description;
      newProduct.image = imageFileName;
      newProduct.category = category
      try {
        await this.imageService.save(imageFileName, image.buffer);
      } catch (error) {
        throw error;
      }
      return await this.productRepository.save(newProduct);
    }
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findById(id);
  }

  async getFilteredProducts(name:string){
    const products = await this.productRepository.getFilteredProducts(name)
    return products
  }
}
