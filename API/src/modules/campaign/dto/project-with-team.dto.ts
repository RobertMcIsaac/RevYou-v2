import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from '../../project/dto/create-project.dto';
import { RespondentDto } from './respondent.dto';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

export class ProjectWithTeamDto extends CreateProjectDto {
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
