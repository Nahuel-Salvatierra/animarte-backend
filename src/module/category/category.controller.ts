import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";

@Controller('category')
export class CategoryController{
  constructor(private readonly categoryService :CategoryService){}

  @Post('')
  async create (@Body() createCategoryDto){
    return await this.categoryService.create(createCategoryDto)
  }

  @Get('')
  async getAll():Promise<Category[]>{
    return await this.categoryService.getAll()
  }

  @Get('/:id')
  async getOne(@Param()id :string){
    return await this.categoryService.getById(+id)
  }
}