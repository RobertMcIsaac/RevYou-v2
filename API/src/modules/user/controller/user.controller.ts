// import { Controller, Get, UseGuards } from '@nestjs/common';
// import { UserService } from '../service/user.service';
// import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

// @Controller('example')
// export class UserController {
//   constructor(private readonly UserService: UserService) {}

//   @Get()
//   printExample() {
//     return {
//       message: 'This is an example message from controller',
//     };
//   }

//   // Apply rate limiting: max 3 requests per minute
//   @Throttle({ default: { limit: 3, ttl: 60000 } })
//   @UseGuards(ThrottlerGuard)
//   @Get('/service')
//   printExampleFromService() {
//     return this.UserService.printExample();
//   }
// }
