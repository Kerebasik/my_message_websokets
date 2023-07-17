import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Group } from './group.schema';
import { Channel } from './channel.schema';
import { Message } from './message.schema';
import { Chat } from './chat.schema';
import { v4 as uuid4 } from 'uuid';

@Schema()
@ObjectType()
export class User {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User firstName ' })
  firstName: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User lastName ' })
  lastName: string;

  @Prop({ required: false })
  @Field(() => String, { description: 'User nickname ' })
  username: string;

  @Prop({ required: false })
  @Field(() => String, { description: 'User biography ' })
  bio: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User email ' })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
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
