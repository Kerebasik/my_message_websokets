import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field(() => String, { description: 'First companion in the chat' })
  first_companion: string;

  @Field(()=>String, { nullable: true, description: "Second companion in the chat" })
  second_companion: string;
}
