import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { IsMsgBuffer } from '../../utils/validators';

export class CustomerCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsMsgBuffer()
  @IsNotEmpty()
  readonly metadata: number[];

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly is_system: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly customer_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly commenter_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly notification_id: number;
}
