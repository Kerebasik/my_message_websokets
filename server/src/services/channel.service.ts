import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddUserToGroupInput } from '../inputs/add-user-to-group.input';
import { Channel, ChannelDocument } from '../schemas/channel.schema';
import { CreateChannelInput } from '../inputs/create-channel.input';
import { AddUserToChannelInput } from '../inputs/add-user-to-channel.input';

@Injectable()
export class ChannelService {
  constructor(@InjectModel(Channel.name) private channelModel: Model<ChannelDocument>) {}

  async createChannel(createChannelInput: CreateChannelInput) {
    const channel = new this.channelModel(createChannelInput);
    return channel.save();
  }

  async addUserToChannel(addUserToChannelInput: AddUserToChannelInput) {
    return this.channelModel.findByIdAndUpdate(
      addUserToChannelInput.channel_id,
      { $push: { subscribers: addUserToChannelInput.user_id } },
      { new: true, useFindAndModify: false }
    ).populate('subscribers').lean();
  }

  async removeUserFromChannel(removeUserToChannelInput: AddUserToChannelInput) {
    return this.channelModel.findByIdAndUpdate(
      removeUserToChannelInput.channel_id,
      { $pull: { subscribers: removeUserToChannelInput.user_id } },
      { new: true, useFindAndModify: false }
    ).populate('subscribers').lean();
  }
}
