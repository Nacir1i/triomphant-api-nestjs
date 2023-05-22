import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class VendorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly company_name: string;

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
