import {
  Body,
  Controller,
  // Delete,
  Get,
  Patch,
  // NotFoundException,
  // Param,
  Post,
  // Req,
  // Put,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@/modules/auth/authUser.decorator';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// @Throttle({ default: { limit: 3, ttl: 60000 } }) // Apply rate limiting: max 3 requests per minute
@UseGuards(ThrottlerGuard)
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST USER
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @AuthUser('sub') sub: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(sub, createUserDto);
  }

  // GET USER
  @Get('me')
  @UseGuards(AuthGuard('jwt')) //Custom guard to prevent unauthenticated users from accessing certain routes
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get the current user's profile" })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Invalid or missing JWT' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOneByAuth0Id(@AuthUser('sub') sub: string): Promise<User> {
    return await this.userService.findOneByAuth0Id(sub);
  }

  // PATCH USER
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update the current user's profile" })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(
    @AuthUser('sub') sub: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(sub, updateUserDto);
  }
}

// getUser()
// service.getUserByAuth0Sub()

// syncUser()
// service.getUserByAuth0Sub()
// service.createUser()

// updateUser()
// service.updateUserProfile()
