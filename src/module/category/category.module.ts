import { Module } from "@nestjs/common";
import { CategoryController } from "./interface/category.controller";
import { CategoryService } from "./app/service/category.service";
import { CategoryRepository } from "./infrastructure/category.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./domain/category.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  controllers:[CategoryController],
  providers:[CategoryService, CategoryRepository],
  exports:[CategoryService]
})
export class CategoryModule{}