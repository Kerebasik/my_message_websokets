import { createUnionType } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { Post } from '../schemas/post.schema';
import { User } from '../schemas/user.schema';
import { Message } from '../schemas/message.schema';
import { Channel } from '../schemas/channel.schema';

export const PlaceType = createUnionType({
  name: 'PlaceType',
  types: () => [User, Message, Group, Channel, Post] as const,
});
