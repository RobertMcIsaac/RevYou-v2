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

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  async findOneByAuth0Id(@Body() createUserDto: CreateUserDto): Promise<User>  {
    const auth0Id: string = createUserDto.auth0Id;
    const user = await this.userService.findOneByAuth0Id(auth0Id);
    return user;
  }

  // @Get('me')
  // async getUser(req, res) => {
  //   const auth0Sub: string = req.auth.payload.sub; 
  //   // Always get sub from Access token (decoded with checkJwt), not from ID token

  // Apply rate limiting: max 3 requests per minute
  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  // @UseGuards(ThrottlerGuard)
}

// getUser()
// syncUser()
// updateUser()
