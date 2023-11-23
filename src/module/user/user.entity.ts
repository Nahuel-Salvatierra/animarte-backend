import { Column, Entity } from 'typeorm';
import { Base } from '../common/base.entity';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  hash: string;

  @Column()
  numberPhone: number;
}
