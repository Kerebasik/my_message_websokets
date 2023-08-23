import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Group } from './group.schema';
import { Channel } from './channel.schema';
import { Message } from './message.schema';
import { Chat } from './chat.schema';
import { v4 as uuid4 } from 'uuid';
import { File } from './file.schema';

@Schema()
@ObjectType()
export class User {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({
    type: { type: mongoose.Schema.Types.String, ref: 'File' },
  })
  @Field(() => File, { description: 'Uploaded files of the message' })
  avatar: File;

  @Prop({ required: true })
  @Field(() => String, { description: 'User firstName ' })
  firstName: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User lastName ' })
  lastName: string;

  @Prop()
  @Field(() => String, { description: 'User nickname ' })
  username: string;

  @Prop()
  @Field(() => String, { description: 'User biography ' })
  bio: string;

  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  @Field(() => String, { description: 'User email ' })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  @Field(() => String, { description: 'User phone ' })
  phone: string;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'User creation date ' })
  created_at: MongooseSchema.Types.Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Group' }],
  })
  @Field(() => [Group], { description: 'User groups' })
  groups: Group[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Channel' }],
  })
  @Field(() => [Channel], { description: 'User channels' })
  channels: Channel[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Chat' }],
  })
  @Field(() => [Chat], { description: 'User chats' })
  chats: Chat[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Message' }],
  })
  messages: Message[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & mongoose.Document;

UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ username: 1 });
