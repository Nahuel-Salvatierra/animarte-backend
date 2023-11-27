import { Column, Entity } from "typeorm";
import { Base } from "../common/base.entity";

@Entity()
export class Product extends Base{
  @Column({unique:true})
  title:string

  @Column()
  description:string

  @Column()
  price:number

  @Column({unique:true})
  image:string
}