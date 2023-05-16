import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class InventoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
