import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEmailConfigDto {
  @ApiProperty({ description: 'Mailbox account login' })
  @IsEmail()
  @IsNotEmpty()
  emailUserName: string;

  @ApiProperty({ description: 'Mailbox account password' })
  @IsString()
  @IsNotEmpty()
  emailPassword: string;

  @ApiProperty({ description: 'SMTP port number' })
  @IsNumber()
  @IsNotEmpty()
  emailSmtpPort: number;

  @ApiProperty({ description: 'SMTP server address' })
  @IsString()
  @IsNotEmpty()
  emailSmtpServer: string;

  @ApiProperty({ description: 'Use STARTTLS' })
  @IsBoolean()
  @IsNotEmpty()
  emailStartTls: boolean;

  @ApiProperty({ description: 'Use SSL/TLS' })
  @IsBoolean()
  @IsNotEmpty()
  emailSslTls: boolean;
}
