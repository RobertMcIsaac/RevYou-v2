import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignDto } from './dto/campaign.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    console.log('Received campaign data:', campaign);
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
  async saveCampaignFeedback(@Body() feedback: any) {
    return 'TBD';
    // const { campaignId, linkUuid, responseContents } = feedback;
    // return await this.campaignService.saveCampaignFeedback(
    //   campaignId,
    //   linkUuid,
    //   responseContents,
    // );
  }

  @Patch('/save-feedback')
  @Version('2')
  @ApiOperation({ summary: 'Save campaign feedback' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async saveCampaignFeedbackV2(@Body() feedback: any) {
    return 'TBD v2';
    // const { campaignId, linkUuid, responseContents } = feedback;
    // return await this.campaignService.saveCampaignFeedback(
    //   campaignId,
    //   linkUuid,
    //   responseContents,
    // );
  }
}

// const createNewCampaign = async (req, res) => {
//   const { title, description, createdBy, projects } = req.body;
//   let campaign;
//   try {
//     if (!title || !createdBy || !projects) {
//       return res
//         .status(400)
//         .json({ message: 'Title, createdBy, and projects are required' });
//     }
//     campaign = await createCampaign(title, description, createdBy, projects);
//   } catch (error) {
//     console.error('Error creating campaign:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
//   res.status(201).json({
//     message: 'Campaign created successfully',
//     campaign: campaign,
//   });
// };

// const getCampaignsByUserId = async (req, res) => {
//   const userId = req.params.userId;
//   if (!userId) {
//     return res.status(400).json({ message: 'User ID is required' });
//   }
//   try {
//     const campaigns = await getCampaignsByUser(userId);
//     res.status(200).json(campaigns);
//   } catch (error) {
//     console.error('Error fetching campaigns:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const getCampaignByIdController = async (req, res) => {
//   const campaignId = req.params.campaignId;
//   console.log('Fetching campaign with ID:', campaignId);
//   if (!campaignId) {
//     return res.status(400).json({ message: 'Campaign ID is not set' });
//   }
//   try {
//     const campaign = await getCampaignByIdService(campaignId);
//     if (!campaign) {
//       return res.status(404).json({ message: 'Campaign not found' });
//     }
//     res.status(200).json(campaign);
//   } catch (error) {
//     console.error('Error fetching campaign:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const getCampaignByLinkController = async (req, res) => {
//   const linkUuid = req.params.linkUuid;
//   console.log('Fetching campaign with link:', linkUuid);
//   if (!linkUuid) {
//     return res.status(400).json({ message: 'Link is not set' });
//   }
//   try {
//     const campaign = await getCampaignByLinkService(linkUuid);
//     if (!campaign) {
//       return res.status(404).json({ message: 'Campaign not found' });
//     }
//     res.status(200).json(campaign);
//   } catch (error) {
//     console.error('Error fetching campaign by link:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const saveCampaignFeedbackController = async (req, res) => {
//   const { campaignId, linkUuid, responseContents } = req.body;
//   if (!campaignId || !linkUuid || !responseContents) {
//     return res
//       .status(400)
//       .json({ message: 'Campaign ID, link UUID, and feedback are required' });
//   }
//   try {
//     const updatedCampaign = await saveCampaignFeedbackService(
//       campaignId,
//       linkUuid,
//       responseContents,
//     );
//     if (!updatedCampaign) {
//       return res
//         .status(404)
//         .json({ message: 'Campaign not found or feedback not saved' });
//     }
//     res
//       .status(200)
//       .json({
//         message: 'Feedback saved successfully',
//         campaign: updatedCampaign,
//       });
//   } catch (error) {
//     console.error('Error saving campaign feedback:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
