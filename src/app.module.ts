import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './module/product/product.module';
import { ImageModule } from './module/image/image.module';
import { CategoryModule } from './module/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'ormConfig';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}, .env`],
    }),
    AuthModule,
    UserModule,
    ProductModule,
    ImageModule,
    CategoryModule,
  ],
})
export class AppModule {}
