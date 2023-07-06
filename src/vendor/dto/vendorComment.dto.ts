import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { BaseComment } from '../../utils/common';

export class VendorCommentDto extends BaseComment {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly vendor_id: number;
}
