import { ProductDto } from './product.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(ProductDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly id: number;
}
