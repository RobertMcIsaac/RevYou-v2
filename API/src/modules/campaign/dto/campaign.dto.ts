import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectWithTeamDto } from './project-with-team.dto';

export class CampaignDto {
  @ApiProperty({ description: 'The title of the campaign' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the campaign' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The ID of the user who created the campaign' })
  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @ApiProperty({
    description: 'The projects associated with the campaign',
    type: [ProjectWithTeamDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectWithTeamDto)
  @IsNotEmpty()
  projects: ProjectWithTeamDto[];
}
