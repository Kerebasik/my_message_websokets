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
export class AddAdminToChannelGuard {
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

    const decoded = this.tokenService.verifyToken(token)
    const sub = decoded.sub;

    const channel = (await this.channelService.getChannelById(
      ctx.getArgs().input.channel_id,
    )) as Channel;

    if (sub !== channel.creator._id) {
      throw new ForbiddenException(
        'Only creator of the channel are allowed to add admins to the channel',
      );
    }
    return true;
  }
}
