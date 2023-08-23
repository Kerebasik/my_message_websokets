import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from '../schemas/poll.schema';
import { PollOption, PollOptionDocument } from '../schemas/pollOption.schema';
import { CreatePollInput } from '../inputs/create-poll.input';
import { Group, GroupDocument } from '../schemas/group.schema';
import { Channel, ChannelDocument } from '../schemas/channel.schema';

@Injectable()
export class PollService {
  constructor(
    @InjectModel(Poll.name) private readonly pollModel: Model<PollDocument>,
    @InjectModel(PollOption.name)
    private readonly optionModel: Model<PollOptionDocument>,
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    @InjectModel(Channel.name)
    private readonly channelModel: Model<ChannelDocument>,
  ) {}

  async createPoll(input: CreatePollInput) {
    let { options, ...rest } = input;
    const optionDocs = await Promise.all(
      options.map((option) => {
        let pollOption = new this.optionModel({ text: option });
        return pollOption.save();
      }),
    );
    const poll = new this.pollModel({
      ...rest,
      options: optionDocs.map((doc) => {
        return doc._id;
      }),
    });
    await poll.save();

    switch (input.receiver_type) {
      case 'Group':
        return this.groupModel
          .findByIdAndUpdate(
            input.receiver,
            { $push: { polls: poll._id } },
            { new: true, useFindAndModify: false },
          )
          .populate('members')
          .populate({
            path: 'messages',
            populate: {
              path: 'files',
              model: 'File',
            },
          })
          .populate({
            path: 'polls',
            populate: { path: 'options', model: 'PollOption' },
          })
          .lean();
      case 'Channel':
        return this.channelModel
          .findByIdAndUpdate(
            input.receiver,
            { $push: { polls: poll._id } },
            { new: true, useFindAndModify: false },
          )
          .populate('subscribers')
          .populate('posts')
          .populate({
            path: 'polls',
            populate: { path: 'options', model: 'PollOption' },
          })
          .lean();
      default:
        throw new BadRequestException(
          'Invalid receiver type has been provide. Either Group or Channel are allowed',
        );
    }
  }

  async voteInPoll(poll_id: string, user_id: string) {
    try {
      return await this.optionModel
        .findByIdAndUpdate(
          poll_id,
          { $addToSet: { votes: user_id } },
          { new: true, useFindAndModify: false },
        )
        .populate('votes')
        .populate('poll')
        .lean();
    } catch (e) {
      console.log(e);
    }
  }

  async removeVoteFromPoll(poll_id: string, user_id: string) {
    return this.optionModel
      .findByIdAndUpdate(
        poll_id,
        { $pull: { votes: user_id } },
        { new: true, useFindAndModify: false },
      )
      .populate('votes')
      .populate('poll')
      .lean();
  }
}
