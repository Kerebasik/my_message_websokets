import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../schemas/user.schema';
import { CreateUserInput } from '../inputs/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(createUserInput: CreateUserInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
    const user = new this.userModel({ ...createUserInput, username: `@${createUserInput.firstName}_${createUserInput.lastName}` });
    return user.save();
  }

  async getUserById(id: string) {
    const user = this.userModel
      .findById(id)
      .populate({
        path: 'chats',
        populate: {
          path: 'messages',
          model: 'Message',
          populate :{
            path: 'files',
            model: 'File',
          }
        },
      })
      .populate({
        path: 'groups',
        populate: {
          path: 'messages',
          model: 'Message',
          populate :{
            path: 'files',
            model: 'File',
          }
        },
      })
      .populate('channels')
      .lean();
    if (!user) {
      throw new NotFoundException(`User doesn't exists`);
    } else {
      return user;
    }
  }

  async getUserByEmail(email: string) {
    const user = this.userModel
      .findOne({ email })
      .populate('groups', 'chats')
      .lean();
    if (!user) {
      throw new NotFoundException(`User doesn't exists`);
    } else {
      return user;
    }
  }

  async getUserByPhone(phone: string) {
    const user = await this.userModel.findOne({ phone }).lean();
    if (!user) {
      throw new NotFoundException(`User doesn't exists`);
    } else {
      return user;
    }
  }
}
