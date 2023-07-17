import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from '../schemas/channel.schema';
import { ChannelService } from '../services/channel.service';
import { ChannelResolver } from '../resolvers/channel.resolver';
import { User, UserSchema } from '../schemas/user.schema';
import { TokenService } from '../services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Channel.name, schema: ChannelSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ChannelService, ChannelResolver, TokenService],
})
export class ChannelModule {}
