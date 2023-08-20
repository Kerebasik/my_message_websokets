import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid4 } from 'uuid';
import { arrayLimit } from '../utils/arrayLimit.util';
import { PollOption } from './pollOption.schema';
import { Group } from './group.schema';
import { Channel } from './channel.schema';
import { PollReceiverType } from '../unions/pollReceiverType.union';
import { BadRequestException } from '@nestjs/common';

@Schema({ validateBeforeSave: true })
@ObjectType()
export class Poll {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, refPath: 'receiver_model' })
  @Field(() => PollReceiverType, { description: 'Poll receiver' })
  receiver: Group | Channel;

  @Prop({ type: MongooseSchema.Types.String, enum: ['Group', 'Channel'] })
  receiver_model: String;

  @Prop({ required: true })
  @Field(() => String, { description: 'Question of the poll' })
  question: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'PollOption' }],
    validate: [
      arrayLimit,
      'The poll should have at least 2 options and no more than 10 options',
    ],
  })
  @Field(() => [PollOption], { description: 'Poll options' })
  options: PollOption[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Message creation date ' })
  created_at: MongooseSchema.Types.Date;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Message update date ' })
  updated_at: MongooseSchema.Types.Date;

  validateOptions(options: PollOption[]) {
    if (options.length < 2 || options.length > 10) {
      throw new Error('The poll should have at least 2 options');
    }
  }
}

export const PollSchema = SchemaFactory.createForClass(Poll);
export type PollDocument = Poll & mongoose.Document;

PollSchema.pre('save', function (next) {
  const poll = this as Poll;
  if (poll.options.length < 2 || poll.options.length > 10) {
    const error = new BadRequestException(
      'The poll should have at least 2 options and no more 10 options',
    );
    return next(error);
  }
  next();
});
