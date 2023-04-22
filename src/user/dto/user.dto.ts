import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly roleId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly imageUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly recruitedAt: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly birthDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly salary: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly status: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsOptional()
  readonly address: string;

  @ApiProperty()
  @IsOptional()
  readonly honorific: string;

  @ApiProperty()
  @IsOptional()
  readonly emergency: boolean;

  @ApiProperty()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly number: string;

  @ApiProperty()
  @IsOptional()
  readonly rib: string;

  @ApiProperty()
  @IsOptional()
  readonly swift: string;

  @ApiProperty()
  @IsOptional()
  readonly ice: string;
}
