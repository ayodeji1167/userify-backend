import { BadRequestException } from '@nestjs/common/exceptions';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void
) => {
  const fileFormats = [
    '.jpeg',
    '.png',
    '.jpg',
    '.webm',
    '.mp4',
    '.wmv',
    '.webp',
    '.mpeg',
    '.doc',
    '.docx',
    '.pdf',
  ];
  const fileCheck = fileFormats.includes(
    path.extname(file.originalname.toLowerCase())
  );
  if (!fileCheck && file.originalname !== 'blob') {
    callback(
      new BadRequestException(
        `Invalid file format , supported file formats are, .png, .jpg, .webm,webp, .mp4,.wmv, .mpeg,`
      ),
      false
    );
  } else {
    callback(null, true);
  }
};

export const imageOptions: MulterOptions = {
  limits: { fileSize: 53348954 },
  fileFilter: imageFilter,
};
