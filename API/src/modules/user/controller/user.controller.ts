import {
  Body,
  Controller,
  // Delete,
  Get,
  NotFoundException,
  // Param,
  Post,
  Req,
  // Put,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import type { FastifyRequest } from 'fastify';

import { AuthGuard } from '@nestjs/passport';
// import { Auth0PayloadDto } from '../auth/dto/auth0Payload.dto';
import { Auth0PayloadDto } from '@/modules/auth/dto/auth0Payload.dto';

import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schema/user.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Throttle({ default: { limit: 3, ttl: 60000 } })
@UseGuards(ThrottlerGuard)
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST USER
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // Apply rate limiting: max 3 requests per minute
  @UseGuards(ThrottlerGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() newUser: CreateUserDto): Promise<User> {
    const user = await this.userService.create(newUser);
    return user;
  }

  // GET USER
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOperation({ summary: "Get the current user's profile" })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  // async findOneByAuth0Id(@Body() user: CreateUserDto): Promise<User | null> {
  async findOneByAuth0Id(
    @Req() req: FastifyRequest & { user: Auth0PayloadDto },
  ): Promise<User> {
    // Passport writes the validated Auth0 token information to req.user
    const { sub } = req.user;
    const user = await this.userService.findOneByAuth0Id(sub);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}

// getUser()
  // service.getUserByAuth0Sub()
// syncUser()
  // service.getUserByAuth0Sub()
  // service.createUser()
// updateUser()
  // service.updateUserProfile()
