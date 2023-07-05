import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @IsEmail()
  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'role of the user' })
  role: string;

  @Field(() => String, { description: 'phone of the user' })
  phone: string;

  @Field(() => String, { description: 'password of the user' })
  password: string;
}
