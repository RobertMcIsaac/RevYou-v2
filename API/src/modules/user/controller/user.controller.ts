import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
export class UserController {
  // constructor(private readonly UserService: UserService) {}

  // @Get()
  // printExample() {
  //   return {
  //     message: 'This is an example message from controller',
  //   };
  // }

  // @Get('me')
  // async getUser(req, res) => {
  //   const auth0Sub: string = req.auth.payload.sub; 
    //Always get sub from Access token (decoded with checkJwt), not from ID token

};

  // Apply rate limiting: max 3 requests per minute
  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  // @UseGuards(ThrottlerGuard)
  // @Get('/service')
  // printExampleFromService() {
  //   return this.UserService.printExample();
  // }
// }


// getUser()
// syncUser()
// updateUser()