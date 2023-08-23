import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from '../schemas/channel.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { Group, GroupDocument } from '../schemas/group.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAllBySearchQuery(query: string) {
    console.log(query)
    const [groups, channels, users ] = await Promise.all([
      this.groupModel
        .find({
          $and: [
            { group_name: { $regex: query, $options: 'i' } },
            { group_type: 'public' },
          ],
        })
        .lean(),
      this.channelModel
        .find({
          $and: [
            { group_name: { $regex: query, $options: 'i' } },
            { channel_type: 'public' },
          ],
        })
        .lean(),
      this.userModel
        .find({
          $or: [
            { firstName: { $regex: query, $options: 'i' } },
            { lastName: { $regex: query, $options: 'i' } },
            { nickname: { $regex: query, $options: 'i' } },
          ],
        })
        .lean(),
    ]);
    return [...groups, ...channels, ...users]
  }

}
