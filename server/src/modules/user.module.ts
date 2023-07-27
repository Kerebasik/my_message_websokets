import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UserResolver } from '../resolvers/user.resolver';
import { TokenService } from '../services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver, TokenService],
})
export class UserModule {}
