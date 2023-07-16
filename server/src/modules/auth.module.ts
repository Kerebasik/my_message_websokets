import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserSchema } from '../schemas/user.schema';
import { AuthResolver } from '../resolvers/auth.resolver';
import { AuthService } from '../services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { UserService } from '../services/user.service';
import { JwtStrategy } from '../strategies/auth.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        publicKey: configService.get<string>('JWT_PUBLIC_KEY'),
        signOptions: { expiresIn: '2h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
