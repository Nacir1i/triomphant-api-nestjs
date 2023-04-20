import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsNumber,
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
  readonly id: number;

  @IsString()
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly phone: string;
}
