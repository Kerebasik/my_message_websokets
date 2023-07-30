import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UploadImageInterface } from '../interfaces/uploadImage.interface';

@Injectable()
export class UploadFileService {
  private s3: S3;
  constructor(private configService: ConfigService) {
    this.s3 = new S3();
  }

  checkFileType(fileExtension: string) {
    switch (fileExtension) {
      case 'image/png' || 'image/jpeg':
        return 'photo';
      case 'video/mp4' || 'video/mov' || 'video/avi':
        return 'video';
      case 'audio/mp3':
        return 'audio';
      case 'image/gif':
        return 'gif';
      case 'audio/ogg':
        return 'voice';
      default:
        return 'file';
    }
  }

  async uploadImage(file: UploadImageInterface) {
    try {
      return await this.s3
        .upload({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Body: file.body,
          Key: `${uuid()}-${file.filename}`,
          ContentType: file.mimetype,
          ContentEncoding: file.encoding,
        })
        .promise()
        .then((data) => {
          data['type'] = this.checkFileType(file.mimetype);
          return data;
        });
    } catch (e) {
      console.log(e);
    }
  }

  async uploadMultipleImages<T extends Express.Multer.File>(files: T[]) {
    try {
      return await Promise.all(
        files.map((file) => {
          return this.s3
            .upload({
              Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
              Body: file.buffer,
              Key: `${uuid()}-${file.originalname}`,
              ContentType: file.mimetype,
              ContentEncoding: file.encoding,
            })
            .promise()
            .then((data) => {
              data['type'] = this.checkFileType(file.mimetype);
              return data;
            });
        }),
      );
    } catch (e) {
      console.log(e);
    }
  }
}
