import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FeedbackDto {
  @ApiProperty({ description: 'The ID of the campaign' })
  @IsString()
  @IsNotEmpty()
  campaignId: string;

  @ApiProperty({ description: 'The unique link identifier' })
  @IsString()
  @IsNotEmpty()
  linkUuid: string;

  @ApiProperty({ description: 'The content of the feedback response' })
  @IsString()
  @IsNotEmpty()
  responseContents: string;
}
