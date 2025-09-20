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

}
