import { Category } from "../../domain/category.entity";

export interface ICategoryRepository{
  save(category:Category):Promise<Category>
  findByName(name: string): Promise<Category>
  getAll():Promise<Category[]>
  getById(id:number): Promise<Category>
}