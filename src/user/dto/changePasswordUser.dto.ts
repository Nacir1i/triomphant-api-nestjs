import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChangePasswordUser {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly new_password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly old_password: string;
}