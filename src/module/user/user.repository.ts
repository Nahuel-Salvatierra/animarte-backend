import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  repository: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async findById(id: number): Promise<User | null> {
    const userFound = await this.repository.findOne({ where: { id } });
    return userFound;
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email: email } });
  }
  async update(updateUserDto):Promise<User>{
    return await this.repository.save(updateUserDto)
  }
}
