import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class PartialTypedUser extends PartialType(UserDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly id: number;
}
