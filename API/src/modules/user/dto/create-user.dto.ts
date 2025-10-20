import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

// import { OmitType, PartialType } from "@nestjs/swagger";
// import { UserDto } from "./user.dto";

// export class CreateUserDto extends PartialType(UserDto) {}

export class CreateUserDto {
  // auth0Id
  @ApiProperty({ description: 'The Auth0 ID of the user' })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'sub' }) // maps auth0 field names to our DB field names
  auth0Id: string;

  // username
  @ApiProperty({ description: 'The username of the user' })
  @Matches('^[a-zA-Z0-9_.]+$', '', {
    message:
      'Username can only contain letters, numbers, underscores, or dots.',
  })
  @IsNotEmpty()
  @Expose({ name: 'nickname' })
  username: string;

  // firstName
  @ApiProperty({ description: 'The first name of the user' })
  @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
    message: 'First name contains invalid characters.',
  })
  @IsOptional()
  @Expose({ name: 'given_name' })
  firstName?: string;

  // lastName
  @ApiProperty({ description: 'The last name of the user' })
  @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
    message: 'Last name contains invalid characters.',
  })
  @IsOptional()
  @Expose({ name: 'family_name' })
  lastName?: string;

  // email
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;
}
