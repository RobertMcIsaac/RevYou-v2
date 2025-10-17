import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { Auth0PayloadDto } from './dto/auth0Payload.dto';
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

  // ORIGINAL METHOD FROM AUTH0 GUIDE
  // validate(payload: unknown): unknown {
  //   return payload;
  // }

  validate(payload: unknown): Auth0PayloadDto {
    if (typeof payload !== 'object' || payload === null) {
      throw new UnauthorizedException('payload is not an object or is null');
    }
    // transforms a plain javascript object (the payload) to instance of specific class (Auth0Payload)
    // i.e. makes sure payload matches shape of Auth0Payload class
    const auth0Payload = plainToInstance(Auth0PayloadDto, payload);

    // executes the validation rules defined in the Auth0Payload class
    const errors = validateSync(auth0Payload);

    if (errors.length > 0 || !auth0Payload.sub) {
      throw new UnauthorizedException('Invalid Auth0 payload');
    }

    return auth0Payload;
  }
}
