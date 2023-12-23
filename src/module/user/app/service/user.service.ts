import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/user.repository';
import { IUserRepository } from '../repository/user.repository.interface';
import { User } from '../../domain/user.entity';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async findById(id: number): Promise<User> {
    const userFound = await this.userRepository.findById(id);
    return userFound;
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(updateUserDto: UpdateUserDto, userId: number): Promise<User> {
    try {
      const userFound = await this.userRepository.findById(userId);
      const userUpdate = {
        id: userFound.id,
        ...updateUserDto,
      };
      return await this.userRepository.update(userUpdate);
    } catch (error) {
      throw error;
    }
  }
}
