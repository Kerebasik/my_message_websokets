import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { CreatePostInput } from '../inputs/create-post.input';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(createPostInput: CreatePostInput) {
    const post = new this.postModel(createPostInput);
    return (await post.save()).populate({path: 'channel', populate: {path: 'posts', model: 'Post'}});
  }

  async deletePost(id: string) {
    return this.postModel.findByIdAndDelete(id).populate('channel', 'comments').lean();
  }
}
