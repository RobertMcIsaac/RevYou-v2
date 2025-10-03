import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignDto } from './dto/campaign.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackDto } from './dto/feedback.dto';

@Controller('campaigns')
@ApiTags('Campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({ status: 201, description: 'Campaign created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createNewCampaign(@Body() campaign: CampaignDto) {
    return await this.campaignService.createCampaign(
      campaign.title,
      campaign.createdBy,
      campaign.projects,
      campaign.description,
    );
  }

  @Get('/user/:userId')
  @ApiOperation({
    summary: 'Get campaigns by user ID',
    description: 'Retrieve all campaigns created by a specific user.',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getCampaignsByUserId(@Param('userId') userId: string) {
    return await this.campaignService.getCampaignsByUser(userId);
  }

  @Get('/campaign/:campaignId')
  @ApiOperation({
    summary: 'Get campaign by ID',
    description: 'Retrieve a campaign by its ID.',
  })
  @ApiParam({ name: 'campaignId', description: 'The ID of the campaign' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getCampaignById(@Param('campaignId') campaignId: string) {
    return await this.campaignService.getCampaignById(campaignId);
  }

  @Get('/link/:linkUuid')
  @ApiOperation({
    summary: 'Get campaign by link',
    description: 'Retrieve a campaign using a unique link identifier.',
  })
  @ApiParam({ name: 'linkUuid', description: 'The unique link identifier' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getCampaignByLink(@Param('linkUuid') linkUuid: string) {
    return await this.campaignService.getCampaignByLink(linkUuid);
  }

  @Patch('/save-feedback')
  @ApiOperation({ summary: 'Save campaign feedback' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async saveCampaignFeedback(@Body() feedback: FeedbackDto) {
    const { campaignId, linkUuid, responseContents } = feedback;
    return await this.campaignService.saveCampaignFeedback(
      campaignId,
      linkUuid,
      responseContents,
    );
  }
}
