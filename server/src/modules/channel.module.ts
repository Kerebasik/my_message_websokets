import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from '../schemas/channel.schema';
import { ChannelService } from '../services/channel.service';
import { ChannelResolver } from '../resolvers/channel.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
  providers: [ChannelService, ChannelResolver],
})
export class ChannelModule {}
