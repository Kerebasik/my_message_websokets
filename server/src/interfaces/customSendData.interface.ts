import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';

export interface CustomSendData extends ManagedUpload.SendData {
  type: string;
}
