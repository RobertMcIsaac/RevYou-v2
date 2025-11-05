import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { FeedbackRequestDto } from './dto/reedback-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('Notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/feedback-request')
  @ApiOperation({ summary: 'Create a new feedback request' })
  @ApiResponse({
    status: 201,
    description: 'Feedback request sent successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createFeedbackRequest(@Body() feedbackRequestDto: FeedbackRequestDto) {
    await this.notificationService.sendNotification(
      feedbackRequestDto.userId,
      feedbackRequestDto.link,
      feedbackRequestDto.to,
      feedbackRequestDto.projectName,
      feedbackRequestDto.fromName,
      feedbackRequestDto.toName,
    );
  }
}
