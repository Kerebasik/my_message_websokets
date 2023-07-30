import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePollInput {
  @Field(() => String, { description: 'Group or channel, where pool will be placed' })
  receiver: string;

  @Field(() => String, { description: 'Type of the receiver, group or channel' })
  receiver_type: string;

  @Field(() => String, { description: 'Question of the pool' })
  question: string;

  @Field(() => String, { nullable: true, description: 'Text of the message' })
  text: string;

  @Field(() => [String], { nullable: true, description: 'Text of the message' })
  options: string[];
}
