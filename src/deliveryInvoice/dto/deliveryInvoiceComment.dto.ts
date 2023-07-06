import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { BaseComment } from '../../utils/common';

export class DeliveryInvoiceCommentDto extends BaseComment {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly deliveryInvoice_id: number;
}
