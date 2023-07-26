import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Message } from './message.schema';
import { v4 as uuid4 } from 'uuid';
import { PlaceType } from '../unions/place.union';
import { Channel } from './channel.schema';
import { Group } from './group.schema';
import { Post } from './post.schema';

@Schema()
@ObjectType()
export class File {
  @Prop({ default: uuid4 })
  @Field(() => ID)
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, refPath: 'place_model' })
  @Field(() => PlaceType, { description: 'Group messages' })
  place: Message | User | Channel | Group | Post;

  @Prop({
    type: MongooseSchema.Types.String,
    enum: ['Message', 'User', 'Post', 'Group', 'Channel'],
  })
  place_model: String;

  @Prop({ required: true })
  @Field(() => String, { description: 'URL of the file ' })
  url: string;

  @Prop({ required: false })
  @Field(() => String, { description: 'Key of the file ' })
  key: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Type of the file ' })
  type: string;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'User creation date ' })
  created_at: MongooseSchema.Types.Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
export type FileDocument = File & mongoose.Document;

FileSchema.index({ key: 1 });
