import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { BaseComment } from 'src/utils/common';

export class CustomerCommentDto extends BaseComment {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly customer_id: number;
}
