import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../schemas/group.schema';
import { Message, MessageSchema } from '../schemas/message.schema';
import { Post, PostSchema } from '../schemas/post.schema';
import { Chat, ChatSchema } from '../schemas/chat.schema';
import { MessageService } from '../services/message.service';
import { MessageResolver } from '../resolvers/message.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Post.name, schema: PostSchema },
      { name: Group.name, schema: GroupSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
