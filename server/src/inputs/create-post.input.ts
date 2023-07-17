import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'Channel for the post ' })
  channel: string;

  @Field(() => String, { description: 'Post text' })
  text: string;
}
