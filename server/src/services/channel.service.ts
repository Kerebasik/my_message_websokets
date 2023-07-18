import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from '../schemas/channel.schema';
import { CreateChannelInput } from '../inputs/create-channel.input';
import { AddUserToChannelInput } from '../inputs/add-user-to-channel.input';
import { User, UserDocument } from '../schemas/user.schema';
import { BanUserFromChannelInput } from '../inputs/ban-user-from-channel.input';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createChannel(createChannelInput: CreateChannelInput, creator_id: string) {
    const channel = new this.channelModel({ ...createChannelInput, creator: creator_id });
    return (await channel.save()).populate('creator');
  }

  async addUserToChannel(addUserToChannelInput: AddUserToChannelInput) {
    await this.userModel.findByIdAndUpdate(
      addUserToChannelInput.user_id,
      { $push: { channels: addUserToChannelInput.channel_id } },
      { new: true, useFindAndModify: false },
    );
    return this.channelModel
      .findByIdAndUpdate(
        addUserToChannelInput.channel_id,
        { $push: { subscribers: addUserToChannelInput.user_id } },
        { new: true, useFindAndModify: false },
      )
      .populate('subscribers')
      .populate('posts')
      .populate('channel_admins')
      .lean();
  }

  async addUserToAdminPool(addUserToChannelInput: AddUserToChannelInput) {
    return this.channelModel
      .findByIdAndUpdate(
        addUserToChannelInput.channel_id,
        { $push: { channel_admins: addUserToChannelInput.user_id } },
        { new: true, useFindAndModify: false },
      )
      .populate('subscribers')
      .populate('posts')
      .populate('channel_admins')
      .lean();
  }

  async banUserFromChannel(banUserFromChannelInput: BanUserFromChannelInput) {
    const channel = await this.getChannelById(banUserFromChannelInput.channel_id) as Channel
    if((channel.subscribers.filter(user=>user._id === banUserFromChannelInput.subscriber_id)).length > 0) {
      return this.channelModel
        .findByIdAndUpdate(
          banUserFromChannelInput.channel_id,
          { $push: { banned_users: banUserFromChannelInput.subscriber_id } },
          { new: true, useFindAndModify: false },
        )
        .populate('subscribers')
        .populate('posts')
        .populate('creator')
        .populate('channel_admins')
        .populate('banned_users')
        .lean();
    } else  {
      throw new BadRequestException('Provided user is not a subscriber')
    }
  }

  async removeUserFromChannel(removeUserToChannelInput: AddUserToChannelInput) {
    await this.userModel.findByIdAndUpdate(
      removeUserToChannelInput.user_id,
      { $pull: { channels: removeUserToChannelInput.channel_id } },
      { new: true, useFindAndModify: false },
    );
    return this.channelModel
      .findByIdAndUpdate(
        removeUserToChannelInput.channel_id,
        { $pull: { subscribers: removeUserToChannelInput.user_id } },
        { new: true, useFindAndModify: false },
      )
      .populate('subscribers')
      .populate('posts')
      .populate('channel_admins')
      .lean();
  }

  async getChannelById(id: string) {
    return this.channelModel
      .findById(id)
      .populate('subscribers')
      .populate('posts')
      .populate('channel_admins')
      .populate('creator')
      .lean();
  }

  async getChannelByName(name: string) {
    return this.channelModel
      .findOne({channel_name: name})
      .populate('subscribers')
      .populate('posts')
      .populate('channel_admins')
      .populate('creator')
      .lean();
  }

  async getAllChannelsBySearchQuery(query: string) {
    return this.channelModel
      .find({channel_name: {$regex: query, $options: "i"}})
      .populate('subscribers')
      .populate('posts')
      .populate('channel_admins')
      .populate('creator')
      .lean();
  }

}
