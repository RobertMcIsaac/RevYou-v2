import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'The Auth0 ID of the user' })
  @IsString()
  @IsNotEmpty()
  auth0Id: string;

  @ApiProperty({ description: 'The username of the user' })
  @Matches('^[a-zA-Z0-9_.]+$', '', {
    message:
      'Username can only contain letters, numbers, underscores, or dots.',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The first name of the user' })
  @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
    message: 'First name contains invalid characters.',
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'The last name of the user' })
  @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
    message: 'Last name contains invalid characters.',
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
