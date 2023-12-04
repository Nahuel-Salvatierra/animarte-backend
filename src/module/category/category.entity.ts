import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../common/base.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Category extends Base {
  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Product, (product) => product.category, { nullable: true })
  products: Product[];
}
