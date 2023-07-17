import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { CreateGroupInput } from '../inputs/create-group.input';
import { GroupService } from '../services/group.service';
import { AddUserToGroupInput } from '../inputs/add-user-to-group.input';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private groupService: GroupService) {}

  @Mutation(() => Group)
  async createGroup(@Args('createGroupInput') group: CreateGroupInput) {
    return this.groupService.createGroup(group);
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

  @Query(() => Group)
  async getGroupById(@Args('id') id: string) {
    return this.groupService.getGroupById(id);
  }
}
