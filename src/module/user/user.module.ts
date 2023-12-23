import { Module } from "@nestjs/common";
import { UserService } from "./app/service/user.service";
import { UserRepository } from "./infrastructure/user.repository";
import { User } from "./domain/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./interface/user.controller";


@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UserController],
    providers:[UserService, UserRepository],
    exports:[UserService]
  })

export class UserModule {}
