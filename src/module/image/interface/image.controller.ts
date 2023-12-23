import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { join } from "path";

@Controller()
export class ImageController{
  
  @Get('/image/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', '..', 'upload', imageName);
    res.sendFile(imagePath);
  }
}