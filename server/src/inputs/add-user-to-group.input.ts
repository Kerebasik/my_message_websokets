import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddUserToGroupInput {
  @Field(() => String, { description: 'Group ' })
  group_id: string;

  @Field(() => String, { description: 'User to add ' })
  user_id: string;
}
