import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Post } from './post.schema';
import { v4 as uuid4 } from 'uuid';
import { Poll } from './poll.schema';
import { GroupType } from '../enums/groupType.enum';

@Schema()
@ObjectType()
export class Channel {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  @Field(() => User, { description: 'Creator of the channel ' })
  creator: User;

  @Prop({ required: true })
  @Field(() => String, { description: 'Channel name ' })
  channel_name: string;

  @Prop({ type: mongoose.Schema.Types.String, default: 'private', enum: ['private, public'] })
  @Field(() => GroupType, { description: 'Channel private type' })
  channel_type: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'User' }],
  })
  @Field(() => [User], { description: 'Channel admins' })
  channel_admins: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'User' }],
  })
  @Field(() => [User], { description: 'Banned users' })
  ban_list: User[];

  @Prop({ required: false })
  @Field(() => String, { nullable: true, description: 'Channel description ' })
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'User' }],
  })
  @Field(() => [User], { description: 'Channel subscribers' })
  subscribers: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Post' }],
  })
  @Field(() => [Post], { description: 'Channel posts' })
  posts: Post[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Poll' }],
  })
  @Field(() => [Poll], { description: 'Channel polls' })
  polls: Poll[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Channel creation date ' })
  created_at: MongooseSchema.Types.Date;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
export type ChannelDocument = Channel & mongoose.Document;

ChannelSchema.index({ group_name: 1 });
