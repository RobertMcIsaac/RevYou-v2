import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsDateString,
} from 'class-validator';

export class ResponseDto {
  // TODO: Consider varibale name alignment (responseContent vs content)

  @ApiProperty({ description: 'The content of the response' })
  @IsString()
  @MinLength(100, {
    message: 'Content is too short. Minimum length is 100 characters.',
  })
  @MaxLength(5000, {
    message: 'Content is too long. Maximum length is 5000 characters.',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'The date when the response was created' })
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
}
