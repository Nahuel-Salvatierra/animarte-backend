import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ICategoryRepository } from "./category.repository.interface";
import { error } from "console";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository:ICategoryRepository
  ){}

  async create(createCategoryDto){
    const categoryFound = await this.categoryRepository.findByName(createCategoryDto.name)
    if (categoryFound) {
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
    return await this.categoryRepository.findByName(name)
  }
}