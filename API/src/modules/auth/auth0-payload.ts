import {
  IsArray,
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class Auth0Payload {
  @IsNotEmpty()
  @IsString()
  iss!: string;

  @IsNotEmpty()
  @IsString()
  sub!: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
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
}
