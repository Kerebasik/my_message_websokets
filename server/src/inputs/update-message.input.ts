import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput {
  @Field(() => String, { description: 'Id of the message' })
  message_id: string;

  @Field(() => String, { description: 'Text of the message' })
  text: string;
}
