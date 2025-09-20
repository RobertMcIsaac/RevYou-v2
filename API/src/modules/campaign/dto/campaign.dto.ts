import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CampaignDto {
  @ApiProperty({ description: 'The title of the campaign' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the campaign' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The start date of the campaign' })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'The end date of the campaign' })
  @IsString()
  @IsNotEmpty()
  endDate: string;
}
