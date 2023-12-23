import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthService } from "../app/service/auth.service";
import { SignUpDto } from "../app/dto/sign-up.dto";
import { LoginDto } from "../app/dto/login.dto";

@Controller('auth')
export class AuthController{
  constructor(
    @Inject(AuthService) private readonly authService:AuthService
  ){}
    @Post('signup')
    async singUp (@Body() createUserDto:SignUpDto){
      return await this.authService.signUp(createUserDto)
    }

    @Post('login')
    async login (@Body() loginUserDto:LoginDto) {
      return await this.authService.login(loginUserDto)
    }
}
