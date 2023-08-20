import { createUnionType } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { Channel } from '../schemas/channel.schema';
import { User } from '../schemas/user.schema';

export const SearchResultsUnion = createUnionType({
  name: 'SearchResultsType',
  types: () => [Group, Channel, User] as const,
});
