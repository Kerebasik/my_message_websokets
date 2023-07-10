import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { AddUserToGroupInput } from '../inputs/add-user-to-group.input';
import { CreatePostInput } from '../inputs/create-post.input';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateMessageInput } from '../inputs/create-message.input';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,
              @InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async createPost(createPostInput: CreatePostInput) {
    const post = new this.postModel(createPostInput);
    return (await post.save()).populate('channel');
  }

  async addCommentToPost(createMessageInput: CreateMessageInput) {
    const messageDoc = new this.messageModel(createMessageInput)
    const message  = await messageDoc.save()
    return this.postModel.findByIdAndUpdate(
      createMessageInput.receiver,
      { $push: { comments: message._id } },
      { new: true, useFindAndModify: false }
    ).populate([{path: 'channel'}, {path: 'comments', populate: {path: 'sender', model: 'User'}}]).lean();
  }

  async deletePost(id: string) {
    return this.postModel.findByIdAndDelete(id).populate('channel', 'comments').lean();
  }
}
