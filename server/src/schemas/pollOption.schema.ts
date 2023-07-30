import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid4 } from 'uuid';
import { Poll } from './poll.schema';
import { User } from './user.schema';

@Schema()
@ObjectType()
export class PollOption {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, ref: 'Poll' })
  @Field(() => Poll, { description: 'User sender' })
  poll: Poll;

  @Prop({ required: true })
  @Field(() => String, { description: 'Question of the poll' })
  text: string;

  @Prop({default: [], type: [{ type: mongoose.Schema.Types.String, ref: 'User' }]})
  @Field(() => [User], { description: 'Option votes' }, )
  votes: User[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Message creation date ' })
  created_at: MongooseSchema.Types.Date;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Message update date ' })
  updated_at: MongooseSchema.Types.Date;
}

export const PollOptionSchema = SchemaFactory.createForClass(PollOption);
export type PollOptionDocument = PollOption & mongoose.Document;
