import * as Buffer from 'buffer';

export interface UploadImageInterface {
  body: Buffer;
  filename: string;
  mimetype: string;
  encoding: string;
}
