import { createUnionType } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { Channel } from '../schemas/channel.schema';

export const PollReceiverType = createUnionType({
  name: 'PollReceiverType',
  types: () => [Group, Channel] as const,
});