import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.schema';
import { UserService } from './user.service';
import { LoginUserInput } from '../inputs/login-user.input';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = (await this.userService.getUserByEmail(email)) as User;
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async generateAccessToken(user: User) {
    const payload = {
      email: user.email,
      sub: user._id,
    };

    return {
      access_token: this.tokenService.signToken(payload),
    };
  }

  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    if (!user) {
      throw new BadRequestException(`Invalid user credentials`);
    } else {
      return this.generateAccessToken(user);
    }
  }
}
