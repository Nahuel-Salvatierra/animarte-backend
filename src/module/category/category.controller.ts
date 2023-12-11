import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";
import { CategoryDto} from './category.dto'

@Controller('category')
export class CategoryController{
  constructor(private readonly categoryService :CategoryService){}

  @Post('')
  async create (@Body() createCategoryDto:CategoryDto){
    const newCategory = new Category()
    newCategory.name = createCategoryDto.name
    newCategory.price = createCategoryDto.price
    return await this.categoryService.create(newCategory)
  }

  @Get('')
  async getAll():Promise<Category[]>{
    return await this.categoryService.getAll()
  }

  @Get('/:name')
  async getOne(@Param()name :string){
    return await this.categoryService.getByName(name)
  }
}