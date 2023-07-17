import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Chat, ChatSchema } from '../schemas/chat.schema';
import { ChatService } from '../services/chat.service';
import { ChatResolver } from '../resolvers/chat.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ChatService, ChatResolver],
})
export class ChatModule {}
