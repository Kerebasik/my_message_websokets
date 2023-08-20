import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../schemas/group.schema';
import { Channel, ChannelSchema } from '../schemas/channel.schema';
import { PollService } from '../services/poll.service';
import { Poll, PollSchema } from '../schemas/poll.schema';
import { PollOption, PollOptionSchema } from '../schemas/pollOption.schema';
import { PollResolver } from '../resolvers/poll.resolver';
import { TokenService } from '../services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Poll.name, schema: PollSchema },
      { name: PollOption.name, schema: PollOptionSchema },
      { name: Group.name, schema: GroupSchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
  ],
  providers: [PollService, PollResolver, TokenService],
})
export class PollModule {}
