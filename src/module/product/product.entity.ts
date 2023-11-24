import { Column, Entity } from "typeorm";
import { Base } from "../common/base.entity";

@Entity()
export class Product extends Base{
  @Column()
  title:string

  @Column()
  description:string

  @Column()
  price:number

  @Column()
  image:string
}