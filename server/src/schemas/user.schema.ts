import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User firstName ' })
  firstName: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User lastName ' })
  lastName: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User email ' })
  email: string;

  @Prop()
  @Field(() => String, { description: 'User role' })
  role: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User phone ' })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & mongoose.Document;

UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
