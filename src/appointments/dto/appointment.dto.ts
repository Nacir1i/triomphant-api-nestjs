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
  readonly categoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly orderId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly customerId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly deliveryInvoiceId: number;
}
