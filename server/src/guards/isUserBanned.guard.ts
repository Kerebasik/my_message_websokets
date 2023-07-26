import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ChannelService } from '../services/channel.service';
import { Channel } from '../schemas/channel.schema';
import { TokenService } from '../services/token.service';
import { PostService } from '../services/post.service';
import { Post } from '../schemas/post.schema';

@Injectable()
export class IsUserBannedGuard {
  constructor(
    private readonly tokenService: TokenService,
    private readonly channelService: ChannelService,
    private readonly postService: PostService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { authorization } = ctx.getContext().req.headers;

    if (!authorization) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action.',
      );
    }

    const token = authorization.replace('Bearer ', '');

    const decoded = this.tokenService.verifyToken(token);
    const sub = decoded.sub;

    const post = (await this.postService.getPostById(
      ctx.getArgs().input.receiver,
    )) as Post;

    const channel = (await this.channelService.getChannelById(
      post.channel._id,
    )) as Channel;

    if (channel.subscribers.filter((user) => user._id === sub).length <= 0) {
      throw new ForbiddenException('You are not a subscriber of the channel');
    }
    if (
      channel.banned_users.filter((user) => user._id === sub).length >= 0 &&
      sub !== channel.creator._id
    ) {
      throw new ForbiddenException(
        'User are banned from the channel and not allowed to watch channel posts and comment them',
      );
    }
    return true;
  }
}
