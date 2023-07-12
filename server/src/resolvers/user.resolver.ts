import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CreateUserInput } from '../inputs/create-user.input';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Resolver(()=> User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async registerUser(@Args('registerUserInput') user: CreateUserInput) {
    return this.userService.registerUser(user);
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Query(() => User)
  async getUserByEmail(@Args('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Query(() => User)
  async getUserByPhone(@Args('phone') phone: string) {
    return this.userService.getUserByPhone(phone);
  }
}
