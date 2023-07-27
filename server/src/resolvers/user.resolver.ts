import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CreateUserInput } from '../inputs/create-user.input';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/auth.guard';
import { AuthToken } from '../decorators/auth.decorator';
import { TokenService } from '../services/token.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService,
              private readonly tokenService: TokenService) {}

  @Mutation(() => User)
  async registerUser(@Args('registerUserInput') user: CreateUserInput) {
    return this.userService.registerUser(user);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getUserById(@AuthToken() token: string,) {
    const payload = this.tokenService.decodeToken(token);
    return this.userService.getUserById(payload.sub);
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
