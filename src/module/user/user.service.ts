import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { IUserRepository } from "./user.repository.interface";
import { User } from "./user.entity";

@Injectable()
export class UserService{
  constructor(
    @Inject(UserRepository) private readonly userRepository:IUserRepository
  ){}

  async findById(id:number):Promise<User>{
    const userFound = await this.userRepository.findById(id)
    return userFound
  }

  async save(user:User):Promise<User>{
    return this.userRepository.save(user)
  }

  async findByEmail(email:string){
    return this.userRepository.findByEmail(email)
  }
}