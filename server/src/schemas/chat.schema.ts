import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Message } from './message.schema';
import { v4 as uuid4 } from 'uuid';

@Schema()
@ObjectType()
export class Chat {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User', unique: true })
  @Field(() => User, { description: 'First companion in the chat ' })
  first_companion: User;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'User', unique: true })
  @Field(() => User, { description: 'Second companion in the chat ' })
  second_companion: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Message' }],
  })
  @Field(() => [Message], { description: 'Group messages' })
  messages: Message[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'User creation date ' })
  created_at: MongooseSchema.Types.Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
export type ChatDocument = Chat & mongoose.Document;

ChatSchema.index({ first_companion: 1 });
ChatSchema.index({ second_companion: 1 });
