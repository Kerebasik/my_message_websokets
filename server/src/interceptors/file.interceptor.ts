import { FilesInterceptor } from '@nestjs/platform-express';

export function createFilesInterceptor(): any {
  return FilesInterceptor('files');
}
