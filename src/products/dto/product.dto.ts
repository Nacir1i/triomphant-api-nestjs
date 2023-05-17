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
  readonly quantityThreshold: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly locationId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly vendor_invoiceId: number;
}
