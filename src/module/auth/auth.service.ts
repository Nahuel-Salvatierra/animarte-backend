import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import * as argon from 'argon2'
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService{
  constructor(  @Inject(UserService) 
  private readonly userService: UserService){}

  async signUp(createUserDto){
    try {
      const userFound = await this.userService.findByEmail(createUserDto.email)
      if(userFound) {
        throw new HttpException(
          `${createUserDto.email} already register`,
          HttpStatus.CONFLICT,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        const hash = await argon.hash(createUserDto.password)
        const newUser = new User()
        newUser.email = createUserDto.email
        newUser.hash = hash
        newUser.lastName = createUserDto.lastName
        newUser.name = createUserDto.name
        
        return this.userService.save(newUser)
      }
    }


    
  }

}