import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../schemas/group.schema';
import { GroupService } from '../services/group.service';
import { GroupResolver } from '../resolvers/group.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [GroupService, GroupResolver],
})
export class GroupModule {}
