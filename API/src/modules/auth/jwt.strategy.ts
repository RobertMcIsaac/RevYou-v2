import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
// import { AuthService } from './auth.service';
// import { User } from '../users/users.service';
import { Auth0Payload } from './auth0-payload';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

// SHOULD IMPLEMENT: Access .env variables fom config file instead of process.env
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(private readonly authService: AuthService) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  // validate(payload: unknown): unknown {
  //   return payload;
  // }

  validate(payload: unknown): Auth0Payload {
    if (typeof payload !== 'object' || payload === null) {
      throw new UnauthorizedException('Invalid Auth0 payload');
    }

    // transforms a plain javascript object (the payload) to instance of specific class (Auth0Payload)
    // i.e. makes sure payload matches shape of Auth0Payload class
    const auth0Payload = plainToInstance(Auth0Payload, payload);

    // executes the validation rules defined in the Auth0Payload class
    // whitelist: true removes any properties that do not have any decorators
    const errors = validateSync(auth0Payload, { whitelist: true });

    if (errors.length > 0) {
      throw new UnauthorizedException('Invalid Auth0 payload');
    }

    return auth0Payload;
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, email: payload.email };
  // }

  // async validate(payload: unknown): Promise<any> {
  //   if (!isValidAuth0Payload(payload) {

  //   })
  //   const user = await this.authService.validateUser(payload['sub']);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  // async validate(username: string, password: string): Promise<any> {
  //   const user = await this.authService.validateUser(username, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
