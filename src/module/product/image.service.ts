import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from "fs"

@Injectable()
export class ImageService {

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

  async save(imageFileName:string, imageBuffer:Buffer){
    const imagePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'upload', imageFileName)
    if (!fs.existsSync('upload')) {
      fs.mkdirSync('upload');
      console.log('dir created');
  } else {
      console.log('dir');
  }
    fs.writeFileSync(imagePath, imageBuffer)
  }
}
