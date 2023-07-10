import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Group } from './group.schema';
import { Post } from './post.schema';
import { ReceiverType } from '../unions/receiver.union';

@Schema()
@ObjectType()
export class Message {
  @Field(() => ID)
  _id: MongooseSchema.Types.UUID | string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { description: 'User sender' })
  sender: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, refPath: 'receiver_model' })
  @Field(() => Post, { description: 'User receiver' })
  receiver: Post | Group;

  @Prop({ type: MongooseSchema.Types.String, enum: ['Group', 'Post'] })
  receiver_model: String;

  @Prop({ required: true })
  @Field(() => String, { description: 'Text of the message' })
  text: string;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Message creation date ' })
  created_at: MongooseSchema.Types.Date;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Message update date ' })
  updated_at: MongooseSchema.Types.Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export type MessageDocument = Message & mongoose.Document;

