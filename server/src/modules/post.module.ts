import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema';
import { PostService } from '../services/post.service';
import { PostResolver } from '../resolvers/post.resolver';
import { Message, MessageSchema } from '../schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }, {name: Message.name, schema: MessageSchema}]),
  ],
  providers: [PostService, PostResolver],
})
export class PostModule {}
