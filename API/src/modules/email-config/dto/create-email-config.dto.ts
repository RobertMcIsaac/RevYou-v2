import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEmailConfigDto {
  @ApiProperty({
    description: 'User ID associated with the email config',
    example: '64a7b2f5c2a3f4b5d6e7f890',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Mailbox account login',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  emailUserName: string;

  @ApiProperty({
    description: 'Mailbox account password',
    example: 'securepassword123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  emailPassword: string;

  @ApiProperty({
    description: 'SMTP port number',
    example: 587,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  emailSmtpPort: number;

  @ApiProperty({
    description: 'SMTP server address',
    example: 'smtp.example.com',
  })
  @IsString()
  @IsNotEmpty()
  emailSmtpServer: string;

  @ApiProperty({ description: 'Use STARTTLS', example: true })
  @IsBoolean()
  @IsNotEmpty()
  emailStartTls: boolean;

  @ApiProperty({ description: 'Use SSL/TLS', example: true, required: true })
  @IsBoolean()
  @IsNotEmpty()
  emailSslTls: boolean;
}
