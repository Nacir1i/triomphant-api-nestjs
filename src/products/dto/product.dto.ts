import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly barcode: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly sku: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly quantityThreshold: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly locationId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly vendor_invoiceId: number;
}