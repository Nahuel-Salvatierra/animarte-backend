import { Module } from '@nestjs/common';
import { SharpModule } from 'nestjs-sharp';
import { ImageService } from './app/service/image.service';
import { ImageController } from './interface/image.controller';

@Module({
  imports: [SharpModule],
  providers: [ImageService],
  exports: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {}
