import {
  Controller,
  Post, UploadedFiles, UseInterceptors,
} from '@nestjs/common';
import { FileService } from '../services/file.service';
import { createFilesInterceptor } from '../interceptors/file.interceptor';

@Controller()
export class FileController{
  constructor(private fileService: FileService) {}

  @Post('graphql/upload')
  @UseInterceptors(createFilesInterceptor())
  async uploadFilesToDatabase(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadFilesToDatabase(files)
  }

}
