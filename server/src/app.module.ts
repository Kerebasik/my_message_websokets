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

@Module({
  imports: [
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
          debug: configService.get<boolean>('DEBUG'),
          uploads: false,
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
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
