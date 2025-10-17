// DECORATOR TO EXTRACT AUTHENTICATED PAYLOAD DATA FROM REQ.USER/ INJECT INTO CONTROLLER PARAMS
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Auth0PayloadDto } from './dto/auth0Payload.dto';

// reusable type for requests with validated user on req.user
export type ReqWithUser = FastifyRequest & { user: Auth0PayloadDto };

// aloows decorator to accept specific key from payload (e.g. 'sub') or returns whole payload
// could add optonal flag later if needed
export type AuthUserData = keyof Auth0PayloadDto | undefined;

export const AuthUser = createParamDecorator(
  (field: AuthUserData | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<ReqWithUser>();
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Missing authenticaed user');
    }
    if (field) {
      return user[field];
    }
    return user;
  },
);
