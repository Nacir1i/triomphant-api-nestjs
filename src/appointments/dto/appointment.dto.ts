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
  readonly categoryId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly orderId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly customerId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly deliveryInvoiceId: string;
}
