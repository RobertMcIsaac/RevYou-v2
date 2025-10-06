import {
  IsArray,
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class Auth0PayloadDto {
  @IsNotEmpty()
  @IsString()
  iss!: string;

  @IsNotEmpty()
  @IsString()
  sub!: string;

  @IsNotEmpty()
  // @IsArray()
  // @IsString({ each: true })
  @IsString()
  aud!: string[];

  @IsOptional()
  @IsString()
  azp?: string;

  @IsOptional()
  @IsNumber()
  exp?: number;

  @IsOptional()
  @IsNumber()
  iat?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scope?: string | string[];

  @IsOptional()
  @IsString()
  gty?: string;
}
