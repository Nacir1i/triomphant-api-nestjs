import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class MaterialDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly sku: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

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
  readonly categoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly locationId: number;
}
