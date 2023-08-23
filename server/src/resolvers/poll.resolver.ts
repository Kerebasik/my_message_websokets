import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { PollService } from '../services/poll.service';
import { CreatePollInput } from '../inputs/create-poll.input';
import { PollOption } from '../schemas/pollOption.schema';
import { AuthToken } from '../decorators/auth.decorator';
import { TokenService } from '../services/token.service';

@Resolver()
export class PollResolver {
  constructor(
    private readonly pollService: PollService,
    private readonly tokenService: TokenService,
  ) {}

  @Mutation(() => Group)
  async createPoll(@Args('input') poll: CreatePollInput) {
    return this.pollService.createPoll(poll);
  }

  @Mutation(() => PollOption)
  async votePoll(@Args('id') id: string, @AuthToken() token: string) {
    const payload = this.tokenService.decodeToken(token);
    return await this.pollService.voteInPoll(id, payload.sub);
  }

  @Mutation(() => PollOption)
  async removeVoteFromPoll(@Args('id') id: string, @AuthToken() token: string) {
    const payload = this.tokenService.decodeToken(token);
    return this.pollService.removeVoteFromPoll(id, payload.sub);
  }
}
