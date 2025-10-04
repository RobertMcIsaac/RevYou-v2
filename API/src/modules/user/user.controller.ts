import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Temporary endpoint to create a user for testing purposes
  @Post('/')
  @ApiOperation({ summary: 'Create a new user (for testing purposes)' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createUser(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }
}
