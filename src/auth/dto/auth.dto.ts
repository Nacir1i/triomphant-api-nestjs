import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, ValidateNested } from 'class-validator';

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

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly roleId: number;

  readonly imageUrl: string;

  readonly recruitedAt: string;

  readonly birthDate: string;

  readonly salary: number;

  readonly status: number;

  @IsNotEmpty()
  @Type(() => ContactInfoDto)
  @ValidateNested()
  readonly contactInformation: ContactInfoDto;

  @Type(() => BankInfoDto)
  @ValidateNested()
  readonly bankInformation: BankInfoDto | undefined;
}
