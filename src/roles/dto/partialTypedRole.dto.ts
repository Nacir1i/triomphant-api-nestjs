import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { RoleDto } from './role.dto';

export class PartialTypedRoleDto extends PartialType(RoleDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly id: number;
}
