import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from '../schemas/channel.schema';
import { CreateChannelInput } from '../inputs/create-channel.input';
import { AddUserToChannelInput } from '../inputs/add-user-to-channel.input';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class ChannelService {
  constructor(@InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
              @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createChannel(createChannelInput: CreateChannelInput) {
    const channel = new this.channelModel(createChannelInput);
    return channel.save();
  }

  async addUserToChannel(addUserToChannelInput: AddUserToChannelInput) {
    await this.userModel.findByIdAndUpdate(
      addUserToChannelInput.user_id,
      { $push: { channels: addUserToChannelInput.channel_id } },
      { new: true, useFindAndModify: false }
    )
    return this.channelModel.findByIdAndUpdate(
      addUserToChannelInput.channel_id,
      { $push: { subscribers: addUserToChannelInput.user_id } },
      { new: true, useFindAndModify: false }
    ).populate('subscribers').lean();
  }

  async removeUserFromChannel(removeUserToChannelInput: AddUserToChannelInput) {
    await this.userModel.findByIdAndUpdate(
      removeUserToChannelInput.user_id,
      { $pull: { channels: removeUserToChannelInput.channel_id } },
      { new: true, useFindAndModify: false }
    )
    return this.channelModel.findByIdAndUpdate(
      removeUserToChannelInput.channel_id,
      { $pull: { subscribers: removeUserToChannelInput.user_id } },
      { new: true, useFindAndModify: false }
    ).populate('subscribers').lean();
  }
}
