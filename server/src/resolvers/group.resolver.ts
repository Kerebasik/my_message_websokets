import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { CreateGroupInput } from '../inputs/create-group.input';
import { GroupService } from '../services/group.service';
import { AddUserToGroupInput } from '../inputs/add-user-to-group.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.guard';
import { AuthToken } from '../decorators/auth.decorator';
import { TokenService } from '../services/token.service';
import { IsUserGroupCreatorGuard } from '../guards/isUserGroupCreator.guard';

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly groupService: GroupService,
    private readonly tokenService: TokenService,
  ) {}

  @Mutation(() => Group)
  @UseGuards(JwtAuthGuard)
  async createGroup(
    @Args('createGroupInput') group: CreateGroupInput,
    @AuthToken() token: string,
  ) {
    const payload = this.tokenService.decodeToken(token);
    return this.groupService.createGroup(group, payload.sub);
  }

  @Mutation(() => Group)
  async addUserToGroup(
    @Args('addUserToGroupInput') addUserToGroupInput: AddUserToGroupInput,
  ) {
    return this.groupService.addUserToGroup(addUserToGroupInput);
  }

  @Mutation(() => Group)
  async removeUserFromGroup(
    @Args('removeUserFromGroup') removeUserFromGroup: AddUserToGroupInput,
  ) {
    return this.groupService.removeUserFromGroup(removeUserFromGroup);
  }

  @Mutation(() => Group)
  @UseGuards(IsUserGroupCreatorGuard)
  async changeGroupPrivateType(
    @Args('id') id: string,
    @Args('type') type: string,
  ) {
    return this.groupService.changeGroupPrivateType(id, type);
  }

  @Query(() => Group)
  async getGroupById(@Args('id') id: string) {
    return this.groupService.getGroupById(id);
  }
}
