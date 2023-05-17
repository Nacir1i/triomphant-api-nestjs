import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { InvoiceCategoryDto } from './invoiceCategory.dto';

export class UpdateInvoiceCategory extends PartialType(InvoiceCategoryDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly id: number;
}
