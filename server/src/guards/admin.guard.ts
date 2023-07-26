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

@Injectable()
export class AdminGuard {
  constructor(
    private readonly tokenService: TokenService,
    private readonly channelService: ChannelService,
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

    const channel = (await this.channelService.getChannelById(
      ctx.getArgs().input.channel,
    )) as Channel;

    if (
      sub !== channel.creator._id &&
      channel.channel_admins.filter((user) => user._id === sub).length <= 0
    ) {
      throw new ForbiddenException(
        'Only creator or admins of the channel are allowed to make a posts',
      );
    }
    return true;
  }
}
