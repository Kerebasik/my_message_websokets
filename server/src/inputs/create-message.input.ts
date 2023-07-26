import { InputType, Field } from '@nestjs/graphql';
import { UploadFileScalar } from '../scalars/upload.scalar';
import { FileUpload } from '../interfaces/fileUpload.interface';

@InputType()
export class CreateMessageInput {
  @Field(() => String, { description: 'Receiver of the message' })
  receiver: string;

  @Field(() => String, { nullable: true, description: 'Receiver type' })
  receiver_model: string;

  @Field(() => String, { nullable: true, description: 'Text of the message' })
  text: string;

  @Field(() => [UploadFileScalar], {
    nullable: true,
    description: 'Text of the message',
  })
  files?: FileUpload[];
}
