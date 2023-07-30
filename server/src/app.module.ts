import { Module } from '@nestjs/common';
import {
  GqlModuleOptions,
  GraphQLModule as NestGraphQLModule,
} from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongodbConfig from './database/mongodb.config';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { GroupModule } from './modules/group.module';
import { ChannelModule } from './modules/channel.module';
import { PostModule } from './modules/post.module';
import { ChatModule } from './modules/chat.module';
import { MessageModule } from './modules/message.module';
import { PassportModule } from '@nestjs/passport';
import { UploadFileScalar } from './scalars/upload.scalar';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { FileModule } from './modules/file.module';
import { PollModule } from './modules/poll.module';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      load: [mongodbConfig],
      isGlobal: true,
    }),
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          installSubscriptionHandlers: true,
          sortSchema: true,
          playground: true,
          csrfPrevention: false,
          debug: configService.get<boolean>('DEBUG'),
          uploads: {
            maxFileSize: 10000000, // 10 MB
            maxFiles: 100,
          },
        } as GqlModuleOptions;
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    GroupModule,
    ChannelModule,
    PostModule,
    ChatModule,
    MessageModule,
    FileModule,
    PollModule
  ],
  controllers: [AppController],
  providers: [AppService, UploadFileScalar],
})
export class AppModule {}
