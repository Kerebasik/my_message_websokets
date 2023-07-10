import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput {
  @Field(() => String, { description: 'Channel name ' })
  channel_name: string;

  @Field(()=>String, {nullable: true, description: "Group description"})
  description?: string;
}
