import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class PartialTypedUser extends PartialType(UserDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly is_deleted: boolean;
}