import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { UserService } from '../../../user/app/service/user.service';
import { RoleEnum, User } from '../../../user/domain/user.entity';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SignUpDto } from '../dto/sign-up.dto';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../dto/login-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  private readonly ACCESS_TOKEN_SECRET:string
  private readonly REFRESH_TOKEN_SECRET:string
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.ACCESS_TOKEN_SECRET = this.configService.get('ACCESS_TOKEN_SECRET')
    this.REFRESH_TOKEN_SECRET = this.configService.get('REFRESH_TOKEN_SECRET')
  }

  async signUp(createUserDto:SignUpDto):Promise<void> {
    try {
      const userFound = await this.userService.findByEmail(createUserDto.email);
      if (userFound) {
        throw new HttpException(
          `${createUserDto.email} already register`,
          HttpStatus.CONFLICT,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        const newUser = await this.createUser(createUserDto)
        this.userService.save(newUser);
      } else {
        throw new HttpException(
          `${createUserDto.email} already register`,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async createUser(createUserDto:SignUpDto):Promise<User>{
    const hash = await argon.hash(createUserDto.password);
        const newUser = new User();
        newUser.email = createUserDto.email;
        newUser.hash = hash;
        newUser.role = RoleEnum.user
        newUser.lastName = createUserDto.lastName;
        newUser.name = createUserDto.name;
        return newUser
  }

  async verifyMatch(hash: string, password: string) {
    return await argon.verify(hash, password);
  }

  async login(loginUserDto:LoginDto):Promise<LoginResponse> {
    let userFound: User | null;
    try {
      userFound = await this.userService.findByEmail(loginUserDto.email);
    } catch (error) {}
    if (userFound) {
      const match = await this.verifyMatch(
        userFound.hash,
        loginUserDto.password,
      );
      if (match) {
        const accessToken = this.getAccessToken(userFound);
        return {
          user: { userRole: [userFound.role], userId: userFound.id },
          accessToken: accessToken,
        };
      } else {
        throw new HttpException(
          'Error: Please ensure all registration fields are filled correctly.',
          HttpStatus.UNAUTHORIZED,)
      }
    } else {
      throw new HttpException(
        'Error: Please ensure all registration fields are filled correctly.',
        HttpStatus.UNAUTHORIZED,)
    }
  }

  private getAccessToken(user: User): string {
    const payload = { id: user.id, email: user.email, role: user.role };
    const options: JwtSignOptions = {
      secret: this.ACCESS_TOKEN_SECRET,
      expiresIn: 60 * 15,
    };
    const accessToken = this.jwtService.sign(payload, options);
    return accessToken;
  }

  async getRefreshToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.REFRESH_TOKEN_SECRET,
      expiresIn: 60 * 60 * 24 * 14,
    });

    return accessToken;
  }
}
