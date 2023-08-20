import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Message } from './message.schema';
import { v4 as uuid4 } from 'uuid';
import { Poll } from './poll.schema';
import { File } from './file.schema';

@Schema()
@ObjectType()
export class Group {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User' })
  @Field(() => User, { description: 'Creator of the group ' })
  creator: User;

  @Prop({
    type: mongoose.Schema.Types.String,
    ref: 'File',
  })
  @Field(() => File, { description: 'Avatar of the group' })
  avatar: File;

  @Prop({ required: true })
  @Field(() => String, { description: 'Group name ' })
  group_name: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    default: 'private',
    enum: ['private', 'public'],
  })
  @Field(() => String, { description: 'Group private type' })
  group_type: string;

  @Prop()
  @Field(() => String, { nullable: true, description: 'User description ' })
  description?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'User' }],
  })
  @Field(() => [User], { description: 'Group members' })
  members: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Message' }],
  })
  @Field(() => [Message], { description: 'Group messages' })
  messages: Message[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Poll' }],
  })
  @Field(() => [Poll], { description: 'Group polls' })
  polls: Poll[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'User creation date ' })
  created_at: MongooseSchema.Types.Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export type GroupDocument = Group & mongoose.Document;

GroupSchema.index({ group_name: 1 });
