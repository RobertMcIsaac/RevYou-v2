import { Body, Controller, Delete, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from '../service/user.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schema/user.schema';

@Throttle({ default: { limit: 3, ttl: 60000 } })
@UseGuards(ThrottlerGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  // @UseGuards(ThrottlerGuard)
  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    const res = await this.userService.create(user);
    return res;
  }

  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  // @UseGuards(ThrottlerGuard)
  @Get('me')
  async findOneByAuth0Id(@Body() user: CreateUserDto): Promise<User | null> {
    const auth0Id: string = user.auth0Id;
    // Need to extract sub from decoded access token, not from user
    const res = await this.userService.findOneByAuth0Id(auth0Id);
    console.log('UserController - findOneByAuth0Id result:', res);
    return res;
  }

  // @Get('me')
  // async getUser(req, res) => {
  //   const auth0Sub: string = req.auth.payload.sub; 
  //   // Always get sub from Access token (decoded with checkJwt), not from ID token

  // Apply rate limiting: max 3 requests per minute
}

// getUser()
// syncUser()
// updateUser()
