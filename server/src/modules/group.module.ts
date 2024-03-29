import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../schemas/group.schema';
import { GroupService } from '../services/group.service';
import { GroupResolver } from '../resolvers/group.resolver';
import { User, UserSchema } from '../schemas/user.schema';
import { TokenService } from '../services/token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [GroupService, GroupResolver, TokenService],
})
export class GroupModule {}
