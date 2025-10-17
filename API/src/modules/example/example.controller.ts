import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExampleService } from './example.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import type { FastifyRequest } from 'fastify';
import { Req } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Auth0PayloadDto } from '../auth/dto/auth0Payload.dto';
import { AuthUser } from '../auth/authUser.decorator';
import type { ReqWithUser } from '../auth/authUser.decorator';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('/')
  printExample() {
    return {
      message: 'This is an example message from controller',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected-route-1')
  accessWithReq(@Req() req: FastifyRequest & { user: Auth0PayloadDto }) {
    return {
      message: 'This is a protected route',
      // Passport writes the validated Auth0 token information to req.user
      user: req.user,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected-route-2')
  accessWithType(@Req() req: ReqWithUser) {
    return {
      message: 'This is a protected route',
      // Passport writes the validated Auth0 token information to req.user
      user: req.user,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected-route-3')
  accessFullDecodedPayload(@AuthUser() user: Auth0PayloadDto) {
    return {
      message: 'This is a protected route',
      user: user,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected-route-4')
  accessSingleClaim(@AuthUser('sub') sub: string) {
    return {
      message: 'This is a protected route',
      sub: sub,
    };
  }

  // Apply rate limiting: max 3 requests per minute
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @UseGuards(ThrottlerGuard)
  @Get('/service')
  printExampleFromService() {
    return this.exampleService.printExample();
  }
}
