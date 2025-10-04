import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The start date of the project',
    example: '2023-10-01T00:00:00Z',
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the project',
    example: '2023-12-31T00:00:00Z',
  })
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'The title of the project' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the project' })
  @IsString()
  @IsOptional()
  description?: string;
}
