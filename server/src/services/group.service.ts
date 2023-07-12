import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';
import { CreateGroupInput } from '../inputs/create-group.input';
import { AddUserToGroupInput } from '../inputs/add-user-to-group.input';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>,
              @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createGroup(createGroupInput: CreateGroupInput) {
    const group = new this.groupModel(createGroupInput);
    return group.save();
  }

  async addUserToGroup(addUserToGroupInput: AddUserToGroupInput) {
    await this.userModel.findByIdAndUpdate(
      addUserToGroupInput.user_id,
      { $push: { groups: addUserToGroupInput.group_id } },
      { new: true, useFindAndModify: false }
    )
    return this.groupModel.findByIdAndUpdate(
      addUserToGroupInput.group_id,
      { $push: { members: addUserToGroupInput.user_id } },
      { new: true, useFindAndModify: false }
    ).populate('members').lean();
  }

  async removeUserFromGroup(removeUserToGroupInput: AddUserToGroupInput) {
    await this.userModel.findByIdAndUpdate(
      removeUserToGroupInput.user_id,
      { $pull: { groups: removeUserToGroupInput.group_id } },
      { new: true, useFindAndModify: false }
    )
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
