import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => String, { nullable: true, description: 'last name of the user' })
  bio: string;

  @IsEmail()
  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'phone of the user' })
  phone: string;

  @IsStrongPassword(
    {
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    },
    {
      message:
        'Password should have at least 1 uppercase letter, 1 lowercase, 1 digit and 1 special symbol',
    },
  )
  @MinLength(6)
  @MaxLength(20)
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
