import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsString()
  @IsOptional()
  readonly honorific: string;

  @IsString()
  @IsOptional()
  readonly emergency: boolean;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly number: string;

  @IsString()
  @IsOptional()
  readonly rib: string;

  @IsString()
  @IsOptional()
  readonly swift: string;

  @IsString()
  @IsOptional()
  readonly ice: string;
}
