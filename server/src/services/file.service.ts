
import { Injectable } from '@nestjs/common';
import { UploadFileService } from './uploadFile.service';
import { CustomSendData } from '../interfaces/customSendData.interface';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from '../schemas/file.schema';
import { Model } from 'mongoose';

@Injectable()
export class FileService {
  constructor(private readonly uploadFileService: UploadFileService,
              @InjectModel(File.name) private fileModel: Model<FileDocument>) {
  }

  async uploadFilesToDatabase(files: Express.Multer.File[]) {
    const uploadedFiles = await this.uploadFileService
      .uploadMultipleImages(files)
      .then((file) => {
        return file.map((obj: CustomSendData) => {
          return {
            url: obj.Location,
            key: obj.Key,
            type: obj.type,
          };
        });
      });
    return await Promise.all(
      uploadedFiles.map((file) => {
        let obj = new this.fileModel({
          ...file,
          place_model: 'Message',
        });
        return obj.save();
      }))
  }

}
