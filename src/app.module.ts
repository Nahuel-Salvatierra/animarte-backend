import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: 'DATABASE.sqlite',
    entities:[__dirname+ '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    AuthModule, UserModule],
})
export class AppModule {}
