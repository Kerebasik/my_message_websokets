import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../schemas/group.schema';
import { Message, MessageSchema } from '../schemas/message.schema';
import { Post, PostSchema } from '../schemas/post.schema';
import { Chat, ChatSchema } from '../schemas/chat.schema';
import { MessageService } from '../services/message.service';
import { MessageResolver } from '../resolvers/message.resolver';
import { TokenService } from '../services/token.service';
import { ChannelService } from '../services/channel.service';
import { Channel, ChannelSchema } from '../schemas/channel.schema';
import { ChannelModule } from './channel.module';
import { User, UserSchema } from '../schemas/user.schema';
import { PostService } from '../services/post.service';
import { PostModule } from './post.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Post.name, schema: PostSchema },
      { name: Group.name, schema: GroupSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Channel.name, schema: ChannelSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [MessageService, MessageResolver, TokenService, ChannelService, ChannelModule, PostService, PostModule],
})
export class MessageModule {}
