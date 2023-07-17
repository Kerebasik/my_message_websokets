import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Channel } from './channel.schema';
import { Message } from './message.schema';
import { v4 as uuid4 } from 'uuid';

@Schema()
@ObjectType()
export class Post {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ type: MongooseSchema.Types.String, ref: 'Channel' })
  @Field(() => Channel, { description: 'Channel for the post' })
  channel: Channel;

  @Prop({ required: true })
  @Field(() => String, { description: 'Text of the post' })
  text: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.String, ref: 'Message' }],
  })
  @Field(() => [Message], { description: 'Post comments' })
  comments: Message[];

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Post creation date ' })
  created_at: MongooseSchema.Types.Date;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Post update date ' })
  updated_at: MongooseSchema.Types.Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = Post & mongoose.Document;
