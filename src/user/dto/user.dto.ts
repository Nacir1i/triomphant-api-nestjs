import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

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
  readonly first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role_id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly image_url: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly recruited_at: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly birth_date: string;

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
