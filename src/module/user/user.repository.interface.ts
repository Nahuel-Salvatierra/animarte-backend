import { User } from "./user.entity";

export interface IUserRepository {
  findById(id:number):Promise<User|null>
  save(user:User):Promise<User>
  findByEmail(email: string): Promise<User>
}