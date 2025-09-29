import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from '../../project/dto/create-project.dto';
import { RespondentDto } from './respondent.dto';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  // IsNotEmpty,
  // IsOptional,
  ValidateNested,
} from 'class-validator';

export class ProjectWithTeamDto extends CreateProjectDto {
  // @ApiProperty({
  //   description: 'The start date of the project',
  //   example: '2023-10-01T00:00:00Z',
  // })
  // @IsNotEmpty()
  // startDate: Date;

  // @ApiProperty({
  //   description: 'The end date of the project',
  //   example: '2023-12-31T00:00:00Z',
  // })
  // @IsOptional()
  // endDate?: Date;

  @ApiProperty({
    description: 'The team members associated with the project',
    type: [RespondentDto],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'A project must have at least one team member.' })
  @ValidateNested({ each: true })
  @Type(() => RespondentDto)
  team: RespondentDto[];
}
