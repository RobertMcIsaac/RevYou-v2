import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ResponseDto } from './response.dto';

export class RespondentDto {
  @ApiProperty({
    description: 'The full name of the respondent',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'The email address of the respondent',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The role of the respondent',
    example: 'Product Manager',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    description: 'Unique link for the respondent',
    example:
      'https://revyou-app.netlify.app/feedback/460945ee-b810-4051-9924-e4ec2fa75d32',
  })
  @IsString()
  link: string;

  @ApiProperty({
    description: 'Whether the respondent has responded',
    example: false,
  })
  @IsNotEmpty()
  isResponded: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseDto)
  responses?: ResponseDto[] = [];
}
