// import { OmitType, PartialType } from '@nestjs/swagger';
import { OmitType, PartialType } from '@nestjs/swagger';
// import {
//   // IsEmail,
//   // IsNotEmpty,
//   IsOptional,
//   IsString,
//   Matches,
// } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['auth0Id', 'email'] as const),
) {}

// export class UpdateUserDto {
//   // firstName
//   @ApiProperty({
//     required: false,
//     description: 'The first name of the user',
//     example: 'John',
//   })
//   @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
//     message: 'First name contains invalid characters.',
//   })
//   @IsOptional()
//   @IsString()
//   firstName?: string;

//   // lastName
//   @ApiProperty({
//     required: false,
//     description: 'The last name of the user',
//     example: 'Doe',
//   })
//   @Matches("^[a-zA-ZÀ-ÿ' -]+$", '', {
//     message: 'Last name contains invalid characters.',
//   })
//   @IsOptional()
//   @IsString()
//   lastName?: string;

//   // username
//   @ApiProperty({
//     required: false,
//     description: 'The username of the user',
//     example: 'john_doe',
//   })
//   @Matches('^[a-zA-Z0-9_.]+$', '', {
//     message:
//       'Username can only contain letters, numbers, underscores, or dots.',
//   })
//   @IsOptional()
//   @IsString()
//   username?: string;

//   // @IsNotEmpty()
//   // @IsEmail()
//   // email: string;
// }
