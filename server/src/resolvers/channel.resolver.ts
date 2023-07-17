import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Channel } from '../schemas/channel.schema';
import { ChannelService } from '../services/channel.service';
import { CreateChannelInput } from '../inputs/create-channel.input';
import { AddUserToChannelInput } from '../inputs/add-user-to-channel.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.guard';
import { TokenService } from '../services/token.service';
import { AuthToken } from '../decorators/auth.decorator';
import { AddAdminToChannelGuard } from '../guards/addAdminToChannel.guard';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService,
              private readonly tokenService: TokenService,) {}

  @Mutation(() => Channel)
  async addUserToChannel(
    @Args('addUserToChannelInput') channel: AddUserToChannelInput,
  ) {
    return this.channelService.addUserToChannel(channel);
  }

  @Mutation(() => Channel)
  @UseGuards(AddAdminToChannelGuard)
  async addUserToAdminPool(
    @Args('input') channel: AddUserToChannelInput,
  ) {
    return this.channelService.addUserToAdminPool(channel);
  }

  @Mutation(() => Channel)
  @UseGuards(JwtAuthGuard)
  async createChannel(@Args('createChannelInput') channel: CreateChannelInput, @AuthToken() token: string) {
    const payload = this.tokenService.decodeToken(token)
    return this.channelService.createChannel(channel, payload.sub);
  }

  @Query(()=>Channel)
  async getChannelById(@Args('id') id: string ) {
    return this.channelService.getChannelById(id)
  }
}
