import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../schemas/group.schema';
import { Channel, ChannelSchema } from '../schemas/channel.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { SearchService } from '../services/search.service';
import { SearchResolver } from '../resolvers/search.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: User.name, schema: UserSchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
  ],
  providers: [SearchService, SearchResolver],
})
export class SearchModule {}
