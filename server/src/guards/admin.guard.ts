import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ChannelService } from '../services/channel.service';
import { Channel } from '../schemas/channel.schema';
import * as process from 'process';

@Injectable()
export class AdminGuard {
  constructor(private readonly jwtService: JwtService,
              private readonly channelService: ChannelService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { authorization } = ctx.getContext().req.headers;

    if (!authorization) {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    }

      const token = authorization.replace('Bearer ', '');

      const decoded = this.jwtService.verify(token, {secret: process.env.JWT_SECRET_KEY, publicKey: process.env.JWT_PUBLIC_KEY});
      const sub = decoded.sub;

      const channel = await this.channelService.getChannelById(ctx.getArgs().input.channel) as Channel

      if (channel.channel_admins.filter(user => user._id === sub).length <= 0) {
        throw new ForbiddenException('Only admins of the channel authorized to perform this action.');
      }
      return true;
  }
}
