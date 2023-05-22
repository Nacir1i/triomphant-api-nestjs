import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class AppointmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly due_date: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly status: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly category_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly order_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly customer_id: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly delivery_invoice_id: number;
}
