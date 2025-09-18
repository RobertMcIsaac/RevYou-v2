import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExampleService } from './example.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  printExample() {
    return {
      message: 'This is an example message from controller',
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
