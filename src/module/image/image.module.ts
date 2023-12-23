import { Module } from '@nestjs/common';
import { SharpModule } from 'nestjs-sharp';
import { ImageService } from './app/service/image.service';

@Module({
  imports: [SharpModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
