import { createUnionType } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { Chat } from '../schemas/chat.schema';
import { Post } from '../schemas/post.schema';

export const ReceiverType = createUnionType({
  name: 'ReceiverType',
  types: () => [Post, Group, Chat] as const,
});
