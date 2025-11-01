import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class FeedbackRequestDto {
  @ApiProperty({
    description: 'The ID of the user behalf whom the feedback request is sent',
    example: '68da88dc60d04dd6fceacaf4',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Personolised link to the feedback form',
    example: 'https://example.com/feedback',
  })
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @ApiProperty({
    description: 'The recipient email address',
    example: 'user@example.com',
  })
  @IsEmail()
  to: string;
}
