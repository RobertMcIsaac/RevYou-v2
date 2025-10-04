import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ProjectDto {
  @ApiProperty({ description: 'The ID of the project' })
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId;

  @ApiProperty({ description: 'The title of the project' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the project' })
  @IsString()
  @IsOptional()
  description?: string;
}
