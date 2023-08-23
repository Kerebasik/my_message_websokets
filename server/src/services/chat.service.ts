import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { CreateChatInput } from '../inputs/create-chat.input';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createPrivateChat(createChatInput: CreateChatInput) {
    const chat = new this.chatModel(createChatInput);
    const doc = chat.save();
    await this.userModel.findByIdAndUpdate(
      createChatInput.first_companion,
      { $addToSet: { chats: chat._id } },
      { new: true, useFindAndModify: false },
    );
    await this.userModel.findByIdAndUpdate(
      createChatInput.second_companion,
      { $addToSet: { chats: chat._id } },
      { new: true, useFindAndModify: false },
    );
    return doc;
  }
  async getChatById(id: string) {
    return this.chatModel
      .findById(id)
      .populate('first_companion')
      .populate('second_companion')
      .populate('messages')
      .lean();
  }
}
