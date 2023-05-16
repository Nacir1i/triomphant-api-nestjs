import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { InventoryDto } from './inventory.dto';

export class updateInventoryDto extends PartialType(InventoryDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly id: number;
}
