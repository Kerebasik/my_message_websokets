import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Post, PostDocument } from '../schemas/post.schema';
import { CreateMessageInput } from '../inputs/create-message.input';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { UpdateMessageInput } from '../inputs/update-message.input';
import { File, FileDocument } from '../schemas/file.schema';
import { UploadFileService } from './uploadFile.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    @Inject(forwardRef(() => UploadFileService))
    private fileService: UploadFileService,
  ) {}

  async sendMessageToGroup(
    createMessageInput: CreateMessageInput,
    sender: string,
  ) {
    const msgDoc = new this.messageModel({
      ...createMessageInput,
      sender: sender,
      receiver_model: 'Group',
    });
    await msgDoc.save();

    return this.groupModel
      .findByIdAndUpdate(
        createMessageInput.receiver,
        { $push: { messages: msgDoc._id } },
        { new: true, useFindAndModify: false },
      )
      .populate('members')
      .populate({
        path: 'messages',
        populate: {
          path: 'files',
          model: 'File',
        },
      })
      .lean();
  }

  async sendCommentToPost(
    createMessageInput: CreateMessageInput,
    sender: string,
  ) {
    const message = new this.messageModel({
      ...createMessageInput,
      sender: sender,
      receiver_model: 'Post',
    });
    await message.save();
    return this.postModel
      .findByIdAndUpdate(
        createMessageInput.receiver,
        { $push: { comments: message._id } },
        { new: true, useFindAndModify: false },
      )
      .populate('comments')
      .populate('channel')
      .lean();
  }

  async sendMessageToChat(
    createMessageInput: CreateMessageInput,
    sender: string,
  ) {
    const message = new this.messageModel({
      ...createMessageInput,
      sender: sender,
      receiver_model: 'Chat',
    });
    await message.save();
    return this.chatModel
      .findByIdAndUpdate(
        createMessageInput.receiver,
        { $push: { messages: message._id } },
        { new: true, useFindAndModify: false },
      )
      .populate('messages')
      .populate('first_companion')
      .populate('second_companion')
      .lean();
  }

  async updateMessageById(updateMessageInput: UpdateMessageInput) {
    return this.messageModel
      .findByIdAndUpdate(
        updateMessageInput.message_id,
        { $set: { text: updateMessageInput.text } },
        { new: true, useFindAndModify: false },
      )
      .populate('sender')
      .populate('receiver')
      .lean();
  }

  async deleteMessageById(id: string) {
    return this.messageModel
      .findByIdAndDelete(id)
      .populate('sender')
      .populate('receiver')
      .lean();
  }
}
