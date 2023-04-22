import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CustomerDto } from './customer.dto';

export class PartialTypedCustomer extends PartialType(CustomerDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly id: number;
}
