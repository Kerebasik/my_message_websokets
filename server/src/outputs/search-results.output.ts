import { Field, ObjectType } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { Channel } from '../schemas/channel.schema';
import { User } from '../schemas/user.schema';

@ObjectType()
export class SearchResultsOutput {
  @Field()
  data: Group | Channel | User;
}
