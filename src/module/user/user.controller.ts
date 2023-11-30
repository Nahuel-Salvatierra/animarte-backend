import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserOutputDto } from './dto/user.output.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getOne(@Param('id') userId: string): Promise<UserOutputDto> {
    const userFound = await this.userService.findById(+userId);
    return new UserOutputDto(userFound);
  }

  @Put(':id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') userId: string,
  ): Promise<UserOutputDto> {
    const userToUpdate = await this.userService.update(updateUserDto, +userId);
    return new UserOutputDto(userToUpdate);
  }
}
