import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
