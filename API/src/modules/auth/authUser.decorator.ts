import {
  createParamDecorator,
  ExecutionContext,
  // UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Auth0PayloadDto } from './dto/auth0Payload.dto';

type ReqWithUser = FastifyRequest & { user: Auth0PayloadDto };

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Auth0PayloadDto => {
    const req = ctx.switchToHttp().getRequest<ReqWithUser>();
    return req.user;
  },
);
