import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Group } from './group.schema';
import { Post } from './post.schema';
import { ReceiverType } from '../unions/messageReceiverType.union';
import { Chat } from './chat.schema';
import { v4 as uuid4 } from 'uuid';
import { File } from './file.schema';

@Schema()
@ObjectType()
export class Message {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, ref: 'User' })
  @Field(() => User, { description: 'User sender' })
  sender: User;

  @Prop({ type: MongooseSchema.Types.String, refPath: 'receiver_model' })
  @Field(() => ReceiverType, { description: 'User receiver' })
  receiver: Post | Group | Chat;

  @Prop({ type: MongooseSchema.Types.String, enum: ['Group', 'Post', 'Chat'] })
  receiver_model: String;

  @Prop({ required: false })
  @Field(() => String, { description: 'Text of the message' })
  text: string;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.String, ref: 'File' }],
  })
  @Field(() => [File], { description: 'Uploaded files of the message' })
  files: File[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Message creation date ' })
  created_at: MongooseSchema.Types.Date;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Message update date ' })
  updated_at: MongooseSchema.Types.Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export type MessageDocument = Message & mongoose.Document;
