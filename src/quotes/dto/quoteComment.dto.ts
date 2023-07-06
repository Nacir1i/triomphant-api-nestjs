import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { BaseComment } from '../../utils/common';

export class QuoteCommentDto extends BaseComment {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly quote_id: number;
}
