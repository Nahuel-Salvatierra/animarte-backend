import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../../common/base.entity";
import { Category } from "../../category/domain/category.entity";

@Entity()
export class Product extends Base{
  @Column({unique:true})
  title:string

  @Column()
  description:string

  @Column({unique:true})
  image:string

  @ManyToOne(()=>Category, category => category.products)
  @JoinColumn()
  category: Category
}