import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddUserToChannelInput {
  @Field(() => String, { description: 'Channel ' })
  channel_id: string;

  @Field(() => String, { description: 'User to add ' })
  user_id: string;
}
