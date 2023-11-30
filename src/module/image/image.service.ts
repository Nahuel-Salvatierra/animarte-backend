import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import sharp from 'sharp';
import { SharpService } from 'nestjs-sharp';

@Injectable()
export class ImageService {
  constructor(private readonly sharpService: SharpService) {}
  renameImage(file: string): string {
    const name = file.split('.')[0];
    const filename = file;
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 32).toString(32))
      .join('');
    const rename = `ANIMARTE${randomName}${filename}`;
    return rename.split(' ').join('');
  }

  async save(imageFileName: string, imageBuffer: Buffer) {
    const resize = await this.resizeImage(imageBuffer, 500);
    const imagePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'upload',
      imageFileName,
    );
    if (!fs.existsSync('upload')) {
      fs.mkdirSync('upload');
    } else {
    }
    fs.writeFileSync(imagePath, resize);
  }

  async resizeImage(imageBuffer: Buffer, width: number): Promise<Buffer> {
    const resizedImage = await this.sharpService
      .edit(imageBuffer)
      .resize({
        width,
      })
      .toBuffer();

    return resizedImage;
  }
}
