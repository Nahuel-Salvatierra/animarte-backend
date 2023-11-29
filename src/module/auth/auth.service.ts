import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto) {
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
        const hash = await argon.hash(createUserDto.password);
        const newUser = new User();
        newUser.email = createUserDto.email;
        newUser.hash = hash;
        newUser.lastName = createUserDto.lastName;
        newUser.name = createUserDto.name;
        return this.userService.save(newUser);
      } else {
        throw new HttpException(
          `${createUserDto.email} already register`,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async verifyMatch(hash: string, password: string) {
    return await argon.verify(hash, password);
  }

  async login(loginUserDto) {
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
          user: { userRole: userFound.role, userId: userFound.id },
          accessToken: accessToken,
        };
      }
    }
  }

  private getAccessToken(user: User): string {
    const payload = { id: user.id, email: user.email, role: user.role };
    const options: JwtSignOptions = {
      secret: 'accessSecret',
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
    const secret = 'secret';
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: 60 * 60 * 24 * 14,
    });

    return accessToken;
  }
}
