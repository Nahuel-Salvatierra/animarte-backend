import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserOutputDto } from "./user.output.dto";
import { UpdateUserDto } from "./updateUser.dto";

@Controller('user')
export class UserController{
  constructor(
    private readonly userService:UserService
  ){}

  @Get(':id')
  async getOne(@Param('id') userId:string):Promise<UserOutputDto>{
    const userFound = await this.userService.findById(+userId)
    return new UserOutputDto(userFound)
  }

  @Put(':id')
  async updateUser(updateUserDto:UpdateUserDto):Promise<UserOutputDto>{
    const userToUpdate = await this.userService.update(updateUserDto)
    return new UserOutputDto(userToUpdate)
  }
}