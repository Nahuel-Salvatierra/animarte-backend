import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './module/product/product.module';
import { ImageModule } from './module/image/image.module';
import { CategoryModule } from './module/category/category.module';
import { ConfigModule } from './module/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'DATABASE.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.register(),
    AuthModule,
    UserModule,
    ProductModule,
    ImageModule,
    CategoryModule,
  ],
})
export class AppModule {}
