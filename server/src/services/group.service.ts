import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../schemas/user.schema';
import { CreateUserInput } from '../inputs/create-user.input';
import * as bcrypt from 'bcrypt';
import { Group, GroupDocument } from '../schemas/group.schema';
import { CreateGroupInput } from '../inputs/create-group.input';
import { AddUserToGroupInput } from '../inputs/add-user-to-group.input';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}

  async createGroup(createGroupInput: CreateGroupInput) {
    const group = new this.groupModel(createGroupInput);
    return group.save();
  }

  async addUserToGroup(addUserToGroupInput: AddUserToGroupInput) {
    return this.groupModel.findByIdAndUpdate(
      addUserToGroupInput.group_id,
      { $push: { members: addUserToGroupInput.user_id } },
      { new: true, useFindAndModify: false }
    ).populate('members').lean();
  }

  async removeUserFromGroup(removeUserToGroupInput: AddUserToGroupInput) {
    return this.groupModel.findByIdAndUpdate(
      removeUserToGroupInput.group_id,
      { $pull: { members: removeUserToGroupInput.user_id } },
      { new: true, useFindAndModify: false }
    ).populate('members').lean();
  }

  async getGroupById(id: string) {
    const group = this.groupModel.findById(id).populate('members').lean();
    if(!group) {
      throw new NotFoundException(`User doesn't exists`)
    } else {
      return group;
    }
  }
}
