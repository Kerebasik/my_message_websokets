import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from '../schemas/file.schema';
import { FileService } from '../services/file.service';
import { FileController } from '../controllers/file.controller';
import { UploadFileService } from '../services/uploadFile.service';

@Module({
  controllers: [FileController],
  imports: [
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
    ]),
  ],
  providers: [FileService, UploadFileService],
})
export class FileModule {}
