import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema';
import { PostService } from '../services/post.service';
import { PostResolver } from '../resolvers/post.resolver';
import { ChannelModule } from './channel.module';
import { ChannelService } from '../services/channel.service';
import { Channel, ChannelSchema } from '../schemas/channel.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { TokenService } from '../services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Channel.name, schema: ChannelSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    PostService,
    PostResolver,
    TokenService,
    ChannelModule,
    ChannelService,
  ],
})
export class PostModule {}
