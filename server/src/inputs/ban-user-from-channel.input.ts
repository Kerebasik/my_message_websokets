import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BanUserFromChannelInput {
  @Field(() => String, { description: 'Channel ' })
  channel_id: string;

  @Field(() => String, { description: 'ID of user, who banned' })
  subscriber_id: string;
}
