import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ContactInfoDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;

  readonly address: string;

  readonly honorific: string;

  readonly emergency: boolean;
}

export class BankInfoDto {
  readonly name: string;

  readonly number: string;

  readonly rib: string;

  readonly swift: string;

  readonly ice: string;
}

export class UserDto {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  @IsOptional()
  readonly username: string;

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly roleId: number;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;

  @IsString()
  @IsOptional()
  readonly recruitedAt: string;

  @IsString()
  @IsOptional()
  readonly birthDate: string;

  @IsString()
  @IsOptional()
  readonly salary: number;

  @IsString()
  @IsOptional()
  readonly status: number;

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
