import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ICategoryRepository } from "./category.repository.interface";
import { Category } from "./category.entity";
import { CategoryRepository } from "./category.repository";
import { CategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository:ICategoryRepository
  ){}

  async create(createCategoryDto:Category){
    const categoryFound = await this.categoryRepository.findByName(createCategoryDto.name)
    if (!categoryFound) {
      return await this.categoryRepository.save(createCategoryDto)
    }
    else {
      throw new HttpException('Not found category', HttpStatus.NOT_FOUND)
    }
  }

  async getAll():Promise<Category[]>{
    return await this.categoryRepository.getAll()
  }

  async getById(id:number):Promise<Category>{
    return await this.categoryRepository.getById(id)
  }

  async getByName(name:string){
    console.log(name)
    return await this.categoryRepository.findByName(name)
  }
}