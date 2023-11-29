import { Column, Entity } from 'typeorm';
import { Base } from '../common/base.entity';

export enum RoleEnum {
  admin = 'admin',
  user = 'user',
}

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @Column()
  numberPhone: number;

  @Column({ default: RoleEnum.user })
  role: RoleEnum;
}
