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
import { UploadFileService } from './file.service';
import { CustomSendData } from '../interfaces/customSendData.interface';

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
    if (createMessageInput.files && createMessageInput.files.length > 0) {
      const uploadedFiles = await this.fileService
        .uploadMultipleImages(createMessageInput.files)
        .then((file) => {
          return file.map((obj: CustomSendData) => {
            return {
              url: obj.Location,
              key: obj.Key,
              type: obj.type,
            };
          });
        });
      const msgDoc = new this.messageModel({
        ...createMessageInput,
        sender: sender,
        receiver_model: 'Group',
      });
      await msgDoc.save();
      const dbFiles = await Promise.all(
        uploadedFiles.map((file) => {
          let obj = new this.fileModel({
            ...file,
            place: msgDoc._id,
            place_model: 'Message',
          });
          return obj.save();
        }),
      );

      return this.messageModel
        .findByIdAndUpdate(
          msgDoc._id,
          {
            $push: {
              files: {
                $each: dbFiles.map((doc) => {
                  return doc._id;
                }),
              },
            },
          },
          { new: true, useFindAndModify: false },
        )
        .populate('files')
        .lean();
    } else {
      const message = new this.messageModel({
        ...createMessageInput,
        sender: sender,
        receiver_model: 'Group',
      });
      await message.save();
      return this.groupModel
        .findByIdAndUpdate(
          createMessageInput.receiver,
          { $push: { messages: message._id } },
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
