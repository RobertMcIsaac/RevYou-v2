import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  // auth0Id
  @ApiProperty({
    description: 'The Auth0 sub of the user',
    example: 'auth0|1234567890',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  auth0Id: string;

  // username
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
    required: false,
  })
  @Matches('^[a-zA-Z0-9_.]+$', '', {
    message:
      'Username can only contain letters, numbers, underscores, or dots.',
  })
  @IsNotEmpty()
  username: string;

  // firstName
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    required: false,
  })
  @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
    message: 'First name contains invalid characters.',
  })
  @IsOptional()
  firstName?: string;

  // lastName
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    required: false,
  })
  @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
    message: 'Last name contains invalid characters.',
  })
  @IsOptional()
  lastName?: string;

  // email
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
