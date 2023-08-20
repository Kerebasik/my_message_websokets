import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenService } from '../services/token.service';
import { GroupService } from '../services/group.service';
import { Group } from '../schemas/group.schema';

@Injectable()
export class IsUserGroupCreatorGuard {
  constructor(
    private readonly tokenService: TokenService,
    private readonly groupService: GroupService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { authorization } = ctx.getContext().req.headers;

    if (!authorization) {
      throw new UnauthorizedException('No auth token is provided');
    }

    const token = authorization.replace('Bearer ', '');

    const decoded = this.tokenService.verifyToken(token);
    const sub = decoded.sub;

    const group = (await this.groupService.getGroupById(
      ctx.getArgs().id,
    )) as Group;

    if (group.creator !== sub) {
      throw new ForbiddenException(
        'Only creator of the group is allowed to perform this action.',
      );
    }

    return true;
  }
}
