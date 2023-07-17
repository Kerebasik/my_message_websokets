import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { CreateChatInput } from '../inputs/create-chat.input';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private groupModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createPrivateChat(createChatInput: CreateChatInput) {
    const chat = new this.groupModel(createChatInput);
    await this.userModel.findByIdAndUpdate(
      createChatInput.first_companion,
      { $push: { chats: chat._id } },
      { new: true, useFindAndModify: false },
    );
    await this.userModel.findByIdAndUpdate(
      createChatInput.second_companion,
      { $push: { chats: chat._id } },
      { new: true, useFindAndModify: false },
    );
    return chat.save();
  }
}
