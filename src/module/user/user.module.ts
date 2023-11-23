import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[],
    providers:[UserService, UserRepository]
  })

export class UserModule {}
