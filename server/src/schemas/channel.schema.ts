import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Post } from './post.schema';

@Schema()
@ObjectType()
export class Channel {
  @Field(() => ID)
  _id: MongooseSchema.Types.UUID | string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Channel name ' })
  channel_name: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true, description: 'Channel description ' })
  description?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.UUID, ref: 'User' }],
  })
  @Field(() => [User], { description: 'Channel subscribers' })
  subscribers: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.UUID, ref: 'Post' }],
  })
  @Field(() => [Post], { description: 'Channel posts' })
  posts: Post[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Channel creation date ' })
  created_at: MongooseSchema.Types.Date;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
export type ChannelDocument = Channel & mongoose.Document;

ChannelSchema.index({ group_name: 1 });
