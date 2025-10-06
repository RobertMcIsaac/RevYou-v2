import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  Post,
  Req,
  // Put,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Auth0PayloadDto } from '../auth/dto/auth0Payload.dto';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  findOne(@Param('username') username: string): UsersDto | null {
    return this.usersService.findOne(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOneByAuth0Sub(
    @Req() req: FastifyRequest & { user: Auth0PayloadDto },
  ): UsersDto | null {
    // Passport writes the validated Auth0 token information to req.user
    const { sub } = req.user;
    return this.usersService.findOneByAuth0Id(sub);
  }

  @Get('all')
  findAll(): UsersDto[] {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body('user') user: UsersDto): UsersDto | null {
    return this.usersService.create(user);
  }
}
