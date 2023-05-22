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
  @IsOptional()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
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
  readonly first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly role_id: number;

  @ApiProperty()
  @IsString()
  readonly image_url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly recruited_at: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly birth_date: string;

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
  readonly contact_information: ContactInfoDto;

  @Type(() => BankInfoDto)
  @ValidateNested()
  readonly bank_information: BankInfoDto | undefined;
}
