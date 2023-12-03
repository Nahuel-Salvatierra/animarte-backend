import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./createUser.dto";
import { LoginUserDto } from "./loginUser.dto";

@Controller('auth')
export class AuthController{
  constructor(
    @Inject(AuthService) private readonly authService:AuthService
  ){}
    @Post('signup')
    async singUp (@Body() createUserDto:CreateUserDto){
      return await this.authService.signUp(createUserDto)
    }

    @Post('login')
    async login (@Body() loginUserDto:LoginUserDto) {
      return await this.authService.login(loginUserDto)
    }
}
