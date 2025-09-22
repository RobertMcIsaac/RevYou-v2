import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResponseDto {
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
}
