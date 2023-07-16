import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Channel } from '../schemas/channel.schema';
import { ChannelService } from '../services/channel.service';
import { CreateChannelInput } from '../inputs/create-channel.input';
import { AddUserToChannelInput } from '../inputs/add-user-to-channel.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.guard';

@Resolver(()=> Channel)
export class ChannelResolver {
  constructor(private channelService: ChannelService) {}

  @Mutation(() => Channel)
  async addUserToChannel(@Args('addUserToChannelInput') channel: AddUserToChannelInput) {
    return this.channelService.addUserToChannel(channel);
  }

  @Mutation(() => Channel)
  async addUserToAdminPool(@Args('addUserToAdminPoolInput') channel: AddUserToChannelInput) {
    return this.channelService.addUserToAdminPool(channel);
  }



  @Mutation(() => Channel)
  @UseGuards(JwtAuthGuard)
  async createChannel(@Args('createChannelInput') channel: CreateChannelInput) {
    return this.channelService.createChannel(channel);
  }
}
