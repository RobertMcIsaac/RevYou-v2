import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  // auth0Id - ignored
  @ApiProperty({ description: 'The Auth0 ID of the user', readOnly: true })
  @IsString()
  @IsOptional() // auth0Id will be set from token, not from request
  auth0Id: string;

  // username
  @ApiProperty({ description: 'The username of the user' })
  @Matches('^[a-zA-Z0-9_.]+$', '', {
    message:
      'Username can only contain letters, numbers, underscores, or dots.',
  })
  @IsNotEmpty()
  @Expose({ name: 'nickname' }) // maps auth0 field names to our DB field names
  username: string;

  // firstName
  @ApiProperty({ description: 'The first name of the user' })
  @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
    message: 'First name contains invalid characters.',
  })
  @IsOptional()
  @Expose({ name: 'given_name' }) // maps auth0 field names to our DB field names
  firstName?: string;

  // lastName
  @ApiProperty({ description: 'The last name of the user' })
  @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
    message: 'Last name contains invalid characters.',
  })
  @IsOptional()
  @Expose({ name: 'family_name' }) // maps auth0 field names to our DB field names
  lastName?: string;

  // email
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;
}
