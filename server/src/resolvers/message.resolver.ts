import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { Post } from '../schemas/post.schema';
import { CreateMessageInput } from '../inputs/create-message.input';
import { MessageService } from '../services/message.service';
import { Chat } from '../schemas/chat.schema';
import { Message } from '../schemas/message.schema';
import { UpdateMessageInput } from '../inputs/update-message.input';

@Resolver()
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Mutation(() => Group)
  async sendMessageToGroup(@Args('createMessageInput') message: CreateMessageInput) {
    return this.messageService.sendMessageToGroup(message);
  }

  @Mutation(() => Post)
  async sendCommentToPost(@Args('createMessageInput') message: CreateMessageInput) {
    return this.messageService.sendCommentToPost(message);
  }

  @Mutation(() => Chat)
  async sendMessageToChat(@Args('createMessageInput') message: CreateMessageInput) {
    return this.messageService.sendMessageToChat(message);
  }

  @Mutation(() => Message)
  async updateMessageById(@Args('updateMessageByIdInput') updateMessageByIdInput: UpdateMessageInput) {
    return this.messageService.updateMessageById(updateMessageByIdInput);
  }

  @Mutation(() => Message)
  async deleteMessageById(@Args('id') id: string) {
    return this.messageService.deleteMessageById(id);
  }
}
