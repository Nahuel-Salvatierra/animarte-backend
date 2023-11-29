import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController{
  constructor(
    @Inject(AuthService) private readonly authService:AuthService
  ){}
    @Post('signup')
    async singUp (@Body() createUserDto){
      return await this.authService.signUp(createUserDto)
    }

    @Post('login')
    async login (@Body() loginUserDto) {
      return this.login(loginUserDto)
    }
}
