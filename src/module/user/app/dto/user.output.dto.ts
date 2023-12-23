import { RoleEnum, User } from "../../domain/user.entity";

export class UserOutputDto{
  name: string;
  lastName: string;
  email: string;
  numberPhone: number;
  role: RoleEnum;

  constructor(user: User) {
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.numberPhone = +user.numberPhone;
    this.role = user.role;
  }
}