import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { CreateGroupInput } from '../inputs/create-group.input';
import { GroupService } from '../services/group.service';
import { AddUserToGroupInput } from '../inputs/add-user-to-group.input';
import { Channel } from '../schemas/channel.schema';
import { ChannelService } from '../services/channel.service';
import { CreateChannelInput } from '../inputs/create-channel.input';

@Resolver(()=> Channel)
export class ChannelResolver {
  constructor(private channelService: ChannelService) {}

  @Mutation(() => Channel)
  async createChannel(@Args('createChannelInput') channel: CreateChannelInput) {
    return this.channelService.createChannel(channel);
  }
}
