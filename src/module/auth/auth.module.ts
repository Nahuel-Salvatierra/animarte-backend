import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './interface/auth.controller';
import { AuthService } from './app/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/domain/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers:[AuthService, ConfigService]
})
export class AuthModule {}
