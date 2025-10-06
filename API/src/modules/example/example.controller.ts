import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExampleService } from './example.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import type { FastifyRequest } from 'fastify';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common/decorators';
import { Auth0PayloadDto } from '../auth/dto/auth0Payload.dto';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  printExample() {
    return {
      message: 'This is an example message from controller',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected-route')
  access(@Req() req: FastifyRequest & { user: Auth0PayloadDto }) {
    return {
      message: 'This is a protected route',
      // Passport writes the validated Auth0 token information to req.user
      user: req.user,
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
