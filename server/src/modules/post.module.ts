import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema';
import { PostService } from '../services/post.service';
import { PostResolver } from '../resolvers/post.resolver';
import { JwtService } from '@nestjs/jwt';
import { ChannelModule } from './channel.module';
import { ChannelService } from '../services/channel.service';
import { Channel, ChannelSchema } from '../schemas/channel.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }, { name: Channel.name, schema: ChannelSchema}, {name: User.name, schema: UserSchema}]),
  ],
  providers: [PostService, PostResolver, JwtService, ChannelModule, ChannelService],
})
export class PostModule {}
