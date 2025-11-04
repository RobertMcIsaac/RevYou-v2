import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class FeedbackRequestDto {
  @ApiProperty({
    description: 'The ID of the user who is requesting a feedback',
    example: '68da88dc60d04dd6fceacaf4',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description:
      'The name of the user making a feedback request, for use in email greetings',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  fromName?: string;

  @ApiProperty({
    description: 'Personalised link to the feedback form',
    example: 'https://example.com/feedback',
  })
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @ApiProperty({
    description: 'The reviewer email address to send the feedback request to',
    example: 'user@example.com',
  })
  @IsEmail()
  to: string;

  @ApiProperty({
    description: 'The name of the reviewer, for use in email',
    example: 'Jane Smith',
  })
  @IsOptional()
  @IsString()
  toName?: string;

  @ApiProperty({
    description: 'The name of the project',
    example: 'Project Alpha',
  })
  @IsOptional()
  @IsString()
  projectName: string;
}
