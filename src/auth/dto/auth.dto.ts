import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class ContactInfoDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly honorific: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly emergency: boolean;
}

export class BankInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly rib: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly swift: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly ice: string;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupDto {
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
  @IsNumber()
  @IsNotEmpty()
  readonly roleId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly recruitedAt: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly birthDate: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly salary: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly status: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => ContactInfoDto)
  @ValidateNested()
  readonly contactInformation: ContactInfoDto;

  @Type(() => BankInfoDto)
  @ValidateNested()
  readonly bankInformation: BankInfoDto | undefined;
}
