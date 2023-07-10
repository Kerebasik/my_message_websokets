import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field(() => String, { description: 'Group name ' })
  group_name: string;

  @Field(()=>String, {nullable: true, description: "Group description"})
  description?: string;
}
