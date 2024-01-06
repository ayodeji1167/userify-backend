import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  private config!: any;

  constructor(private configService: ConfigService) {
    this.config = configService.get('cloudinary');
    v2.config({
      cloud_name: this.config.name,
      api_key: this.config.apiKey,
      api_secret: this.config.secret,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    section = 'IMAGE',
    resourceType: 'image' | 'video' | 'raw' | 'auto' = 'image'
  ) {
    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          folder: `USERIFY/${section}`,
          resource_type: resourceType,
        },
        (err, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async uploadSingleImage(
    file: Express.Multer.File,
    section = 'IMAGE',
    resourceType: 'image' | 'video' | 'raw' | 'auto' = 'image'
  ): Promise<any> {
    let result;
    try {
      result = (await this.uploadImage(file, section, resourceType)) as any;
    } catch (err) {
      throw new BadRequestException(err);
    }
    return {
      url: result?.secure_url,
      publicId: result?.public_id,
    };
  }

  async uploadMultipleImages(
    files: Express.Multer.File[],
    section = 'IMAGE',
    resourceType: 'image' | 'video' | 'raw' | 'auto' = 'image'
  ) {
    const result = [];
    for (const file of files) {
      const res = await this.uploadSingleImage(file, section, resourceType);
      result.push(res);
    }
    return result;
  }
}
