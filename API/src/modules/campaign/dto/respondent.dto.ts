import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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
  @IsOptional()
  role?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseDto)
  responses: ResponseDto[];
}
