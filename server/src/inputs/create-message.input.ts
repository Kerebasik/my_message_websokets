import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String, { description: 'Receiver of the message' })
  receiver: string;

  @Field(() => String, { nullable: true, description: 'Receiver type' })
  receiver_model: string;

  @Field(() => String, { description: 'Text of the message' })
  text: string;
}
