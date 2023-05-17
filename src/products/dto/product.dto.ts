import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly cost: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly barcode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly sku: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly quantityThreshold: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly location_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly category_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly vendor_invoice_id: string;
}
