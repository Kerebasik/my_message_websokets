import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { Post } from '../schemas/post.schema';
import { CreateMessageInput } from '../inputs/create-message.input';
import { MessageService } from '../services/message.service';
import { Chat } from '../schemas/chat.schema';
import { Message } from '../schemas/message.schema';
import { UpdateMessageInput } from '../inputs/update-message.input';
import { UseGuards } from '@nestjs/common';
import { IsUserBannedGuard } from '../guards/isUserBanned.guard';
import { AuthToken } from '../decorators/auth.decorator';
import { TokenService } from '../services/token.service';
import { FileUpload } from '../interfaces/fileUpload.interface';
import { UploadFileScalar } from '../scalars/upload.scalar';

@Resolver()
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly tokenService: TokenService,
  ) {}

  @Mutation(() => Group)
  async sendMessageToGroup(
    @AuthToken() token: string,
    @Args('input') message: CreateMessageInput,
    @Args({ name: 'files', type: () => [UploadFileScalar], nullable: true }) files?: FileUpload[],
  ) {
    const payload = this.tokenService.decodeToken(token);
    return this.messageService.sendMessageToGroup({...message, files: files}, payload.sub);
  }

  @Mutation(() => Post)
  @UseGuards(IsUserBannedGuard)
  async sendCommentToPost(
    @Args('input') message: CreateMessageInput,
    @AuthToken() token: string,
  ) {
    const payload = this.tokenService.decodeToken(token);
    return this.messageService.sendCommentToPost(message, payload.sub);
  }

  @Mutation(() => Chat)
  async sendMessageToChat(
    @Args('createMessageInput') message: CreateMessageInput,
    @AuthToken() token: string,
  ) {
    const payload = this.tokenService.decodeToken(token);
    return this.messageService.sendMessageToChat(message, payload.sub);
  }

  @Mutation(() => Message)
  async updateMessageById(
    @Args('updateMessageByIdInput') updateMessageByIdInput: UpdateMessageInput,
  ) {
    return this.messageService.updateMessageById(updateMessageByIdInput);
  }

  @Mutation(() => Message)
  async deleteMessageById(@Args('id') id: string) {
    return this.messageService.deleteMessageById(id);
  }
}
