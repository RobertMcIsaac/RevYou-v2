import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { EmailConfigService } from './email-config.service';
import { CreateEmailConfigDto } from './dto/create-email-config.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateEmailConfigDto } from './dto/update-email-config.dto';

@Controller('email-configs')
@ApiTags('Email Configurations')
export class EmailConfigController {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new email configuration' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createEmailConfig(@Body() emailConfigDto: CreateEmailConfigDto) {
    return this.emailConfigService.createEmailConfig(emailConfigDto);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get email configuration by user ID' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getEmailConfig(@Param('userId') userId: string) {
    return this.emailConfigService.getEmailConfig(userId);
  }

  @Patch('/user/:userId')
  @ApiOperation({ summary: 'Update email configuration by user ID' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateEmailConfig(
    @Param('userId') userId: string,
    @Body() emailConfigDto: UpdateEmailConfigDto,
  ) {
    return this.emailConfigService.updateEmailConfig(userId, emailConfigDto);
  }
}
