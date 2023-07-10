import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { User } from './user.schema';
import { Message } from './message.schema';

@Schema()
@ObjectType()
export class Group {
  @Field(() => ID)
  _id: MongooseSchema.Types.UUID | string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Group name ' })
  group_name: string;

  @Prop({ required: false })
  @Field(() => String, { nullable: true, description: 'User description ' })
  description?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  @Field(() => [User], { description: 'Group members' })
  members: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.UUID, ref: 'Message' }],
  })
  @Field(() => [Message], { description: 'Group messages' })
  messages: Message[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'User creation date ' })
  created_at: MongooseSchema.Types.Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export type GroupDocument = Group & mongoose.Document;

GroupSchema.index({ group_name: 1 });
