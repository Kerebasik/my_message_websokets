import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Chat } from '../schemas/chat.schema';
import { ChatService } from '../services/chat.service';
import { CreateChatInput } from '../inputs/create-chat.input';

@Resolver(()=> Chat)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Mutation(() => Chat)
  async createChat(@Args('createChatInput') chat: CreateChatInput) {
    return this.chatService.createPrivateChat(chat);
  }
}
