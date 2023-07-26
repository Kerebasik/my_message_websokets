import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { TokenPayloadInterface } from '../interfaces/tokenPayload.interface';

@Injectable()
export class TokenService extends JwtService {
  verifyToken(token: string) {
    try {
      return super.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
        publicKey: process.env.JWT_PUBLIC_KEY,
      });
    } catch (e) {
      console.log(e);
    }
  }

  decodeToken(token: string): TokenPayloadInterface {
    token = token.replace('Bearer', '').slice(1);
    return super.decode(token) as TokenPayloadInterface;
  }

  signToken<T extends TokenPayloadInterface>(payload: T): string {
    return super.sign(payload, { secret: process.env.JWT_SECRET_KEY });
  }
}
